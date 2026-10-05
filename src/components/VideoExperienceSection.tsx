"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

export type Video = {
  id: string;
  date: string;
  label?: string;
  thumbnail: string;
};

// The main players use Facebook's player SDK so the page can control them: when
// one video starts playing, every other player on the page pauses. (Facebook's
// player can't start itself with sound, so visitors press play; audio is on.)
type FbPlayer = {
  pause: () => void;
  subscribe: (event: string, cb: () => void) => { release: () => void } | undefined;
};
type FbReadyMsg = { type: string; id: string; instance: FbPlayer };
type FbSdk = {
  init: (opts: { xfbml: boolean; version: string }) => void;
  XFBML: { parse: (el?: Element) => void };
  Event: {
    subscribe: (event: string, cb: (msg: FbReadyMsg) => void) => void;
    unsubscribe: (event: string, cb: (msg: FbReadyMsg) => void) => void;
  };
};
declare global {
  interface Window {
    FB?: FbSdk;
    fbAsyncInit?: () => void;
  }
}

// Facebook's player hides its own fullscreen button on phones, so the main
// player gets ours there. Element fullscreen isn't available on iPhone Safari,
// where the button simply doesn't render.
const subscribeFullscreen = (onChange: () => void) => {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
};
const getFullscreenElement = () => document.fullscreenElement;
const getCanFullscreen = () => document.fullscreenEnabled;
const noop = () => () => {};

// Every mounted player, so starting one can pause the rest
const livePlayers = new Map<string, FbPlayer>();

let fbSdkPromise: Promise<FbSdk> | null = null;
function loadFacebookSdk(): Promise<FbSdk> {
  if (fbSdkPromise) return fbSdkPromise;
  fbSdkPromise = new Promise((resolve) => {
    if (window.FB) return resolve(window.FB);
    window.fbAsyncInit = () => {
      window.FB!.init({ xfbml: false, version: "v19.0" });
      resolve(window.FB!);
    };
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  });
  return fbSdkPromise;
}

function MainVideoPlayer({
  video,
  kind,
  onPlayingChange,
}: {
  video: Video;
  kind: "Sermon" | "Worship";
  onPlayingChange: (playing: boolean) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerId = `fb-player-${video.id}`;
  // Our own loading state; the parent keys this component by video, so it resets per video
  const [loaded, setLoaded] = useState(false);
  // Facebook never finished loading (blocked, offline, etc.): offer a direct link instead
  const [failed, setFailed] = useState(false);
  // After a tap on the player, show our spinner until Facebook reports it's playing,
  // so a slow first start reads as "loading" rather than a dead black screen.
  // (Facebook doesn't send buffering events, so the tap is detected via window blur.)
  const [starting, setStarting] = useState(false);
  const canFullscreen = useSyncExternalStore(noop, getCanFullscreen, () => false);
  const fullscreenEl = useSyncExternalStore(subscribeFullscreen, getFullscreenElement, () => null);
  const isFullscreen = fullscreenEl?.getAttribute("data-player-host") === playerId;

  const toggleFullscreen = async () => {
    const host = hostRef.current;
    if (!host) return;
    if (isFullscreen) {
      await document.exitFullscreen().catch(() => {});
      return;
    }
    await host.requestFullscreen().catch(() => {});
    // Turn phones sideways where the browser allows it (Android Chrome)
    const orientation = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
    await orientation.lock?.("landscape").catch(() => {});
  };
  // Kept in a ref so a new callback doesn't reload the player
  const onPlayingChangeRef = useRef(onPlayingChange);
  useEffect(() => {
    onPlayingChangeRef.current = onPlayingChange;
  }, [onPlayingChange]);

  useEffect(() => {
    let cancelled = false;
    let sdk: FbSdk | null = null;
    const subs: ({ release: () => void } | undefined)[] = [];
    const onReady = (msg: FbReadyMsg) => {
      if (msg.type !== "video" || msg.id !== playerId) return;
      const player = msg.instance;
      livePlayers.set(playerId, player);
      subs.push(
        player.subscribe("startedPlaying", () => {
          playing = true;
          setLoaded(true);
          setStarting(false);
          clearTimeout(startTimer);
          onPlayingChangeRef.current(true);
          livePlayers.forEach((other, id) => {
            if (id !== playerId) other.pause();
          });
        }),
        player.subscribe("paused", () => {
          playing = false;
          onPlayingChangeRef.current(false);
        }),
        player.subscribe("finishedPlaying", () => {
          playing = false;
          onPlayingChangeRef.current(false);
        }),
      );
    };

    // A tap inside the cross-origin player moves focus into its iframe
    let playing = false;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    const onWindowBlur = () => {
      const iframe = hostRef.current?.querySelector("iframe");
      if (!iframe || document.activeElement !== iframe || playing) return;
      setStarting(true);
      clearTimeout(startTimer);
      startTimer = setTimeout(() => setStarting(false), 12000);
    };
    window.addEventListener("blur", onWindowBlur);
    // Hide the spinner only once Facebook's iframe has finished loading (its
    // "ready" event fires earlier, while the frame is still black), plus a beat
    // for the poster to paint. A long fallback keeps it from spinning forever.
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const reveal = (delay: number) => {
      clearTimeout(fallbackTimer);
      clearTimeout(revealTimer);
      revealTimer = setTimeout(() => setLoaded(true), delay);
    };
    const fallbackTimer = setTimeout(() => setFailed(true), 25000);
    const observer = new MutationObserver(() => {
      const iframe = hostRef.current?.querySelector("iframe");
      if (!iframe) return;
      observer.disconnect();
      iframe.addEventListener("load", () => reveal(700), { once: true });
    });
    if (hostRef.current) observer.observe(hostRef.current, { childList: true, subtree: true });

    loadFacebookSdk().then((fb) => {
      if (cancelled || !hostRef.current) return;
      sdk = fb;
      fb.Event.subscribe("xfbml.ready", onReady);
      fb.XFBML.parse(hostRef.current);
    });
    return () => {
      cancelled = true;
      sdk?.Event.unsubscribe("xfbml.ready", onReady);
      window.removeEventListener("blur", onWindowBlur);
      clearTimeout(startTimer);
      subs.forEach((sub) => sub?.release());
      observer.disconnect();
      clearTimeout(revealTimer);
      clearTimeout(fallbackTimer);
      livePlayers.delete(playerId);
    };
  }, [playerId]);

  return (
    <div
      ref={hostRef}
      data-player-host={playerId}
      aria-label={`${kind} from New Life Assembly of God, ${video.date}`}
      role="region"
      className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 [&_.fb-video]:!absolute [&_.fb-video]:!inset-0 [&_span]:!w-full [&_span]:!h-full [&_iframe]:!w-full [&_iframe]:!h-full [&:fullscreen]:rounded-none portrait:[&:fullscreen_.fb-video]:![inset:auto_0] portrait:[&:fullscreen_.fb-video]:![top:50%] portrait:[&:fullscreen_.fb-video]:![transform:translateY(-50%)] portrait:[&:fullscreen_.fb-video]:![height:auto] portrait:[&:fullscreen_.fb-video]:![aspect-ratio:16/9]"
    >
      <div
        key={video.id}
        id={playerId}
        className="fb-video"
        data-href={`https://www.facebook.com/reel/${video.id}`}
        data-width="auto"
        data-show-text="false"
        data-allowfullscreen="true"
      />
      {loaded && canFullscreen && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit full screen" : "Watch full screen"}
          className="[@media(hover:hover)]:hidden absolute top-3 left-3 z-20 w-10 h-10 rounded-full bg-black/55 text-white flex items-center justify-center backdrop-blur-sm active:scale-95 transition-transform"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Maximize2 className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      )}
      {loaded && starting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 pointer-events-none" role="status" aria-label="Loading video">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[3px] border-white/20 border-t-brand-gold animate-spin" />
        </div>
      )}
      {/* Loading overlay: the video's thumbnail, dimmed, with a spinner until Facebook's player is ready */}
      <div
        aria-hidden={loaded}
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        } ${failed ? "" : "pointer-events-none"
        }`}
      >
        <img
          src={video.thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-sm brightness-50"
        />
        {failed ? (
          <div className="relative flex flex-col items-center gap-3 px-6 text-center" role="status">
            <p className="text-white/85 text-sm md:text-base">
              This video couldn&apos;t load here.
            </p>
            <a
              href={`https://www.facebook.com/reel/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tap btn-gold px-5 py-2.5 rounded-lg text-sm inline-flex items-center gap-1.5"
            >
              Watch on Facebook
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-3" role="status">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[3px] border-white/20 border-t-brand-gold animate-spin" />
            <p className="text-white/80 text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
              Loading video
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function VideoCard({
  video,
  active,
  playing,
  onSelect,
  kind,
}: {
  video: Video;
  active: boolean;
  playing: boolean;
  onSelect: () => void;
  kind: "Sermon" | "Worship";
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Watch ${kind.toLowerCase()} from ${video.date}`}
      aria-pressed={active}
      className={`group relative shrink-0 w-60 md:w-72 snap-start rounded-xl md:rounded-2xl overflow-hidden bg-black/40 text-left border-2 transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:border-brand-accent ${
        active
          ? "border-brand-accent shadow-[0_0_0_1px_rgba(37,99,171,0.4),0_12px_32px_-12px_rgba(37,99,171,0.55)]"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-80 group-hover:opacity-95"
          }`}
        />
        {/* Only once the big player is actually playing */}
        {active && playing && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-accent text-white text-[10px] font-semibold tracking-widest uppercase shadow-md">
            Now Playing
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4">
          {video.label && (
            <p className="text-brand-accent text-xs font-medium tracking-widest uppercase mb-1">
              {video.label}
            </p>
          )}
          <p className="font-serif text-base md:text-lg font-bold text-white drop-shadow">
            {video.date}
          </p>
        </div>
      </div>
    </button>
  );
}

function VideoRail({
  videos,
  activeId,
  playing,
  onSelect,
  kind,
}: {
  videos: Video[];
  activeId: string;
  playing: boolean;
  onSelect: (id: string) => void;
  kind: "Sermon" | "Worship";
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [videos.length]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 280);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="relative -mx-4 md:-mx-8">
      <div
        ref={scrollerRef}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-proximity px-4 md:px-8 pr-10 md:pr-12 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            active={video.id === activeId}
            playing={playing}
            onSelect={() => onSelect(video.id)}
            kind={kind}
          />
        ))}
        <div aria-hidden="true" className="shrink-0 w-2 md:w-4" />
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-black to-transparent transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        type="button"
        aria-label={`Scroll ${kind.toLowerCase()} list left`}
        onClick={() => scrollBy(-1)}
        disabled={!canScrollLeft}
        className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-black/70 backdrop-blur-sm ring-1 ring-white/15 text-white transition-all duration-300 hover:bg-black/90 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={`Scroll ${kind.toLowerCase()} list right`}
        onClick={() => scrollBy(1)}
        disabled={!canScrollRight}
        className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-black/70 backdrop-blur-sm ring-1 ring-white/15 text-white transition-all duration-300 hover:bg-black/90 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function VideoExperienceSection({
  title,
  eyebrow,
  videos,
  kind,
  decor,
}: {
  title: string;
  eyebrow?: string;
  videos: Video[];
  kind: "Sermon" | "Worship";
  decor?: string;
}) {
  const [activeId, setActiveId] = useState<string>(videos[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(false);
  const active = videos.find((v) => v.id === activeId) ?? videos[0];

  if (!active) return null;

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#0a1328] via-[#070e1f] to-[#050916] overflow-hidden aurora gradient-mesh">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,88,152,0.28),transparent_65%)]"
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className="orb orb-float absolute w-[420px] h-[420px] -top-24 -right-28 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,184,108,0.16) 0%, rgba(232,184,108,0) 70%)",
        }}
      />
      {decor && (
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-4 md:right-8 md:bottom-10 font-serif italic text-[7rem] md:text-[16rem] leading-none text-white/[0.05] select-none pointer-events-none z-0"
        >
          {decor}
        </span>
      )}
      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <span
          aria-hidden="true"
          className="block h-px w-12 bg-brand-gold/70 mb-5"
        />
        {eyebrow && (
          <p className="text-brand-gold text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase font-medium mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-8 md:mb-12 [text-shadow:0_4px_24px_rgba(0,0,0,0.35)]">
          {title}
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainVideoPlayer key={active.id} video={active} kind={kind} onPlayingChange={setIsPlaying} />
            <figcaption className="mt-4 md:mt-5 text-white/80">
              <p className="font-serif text-lg md:text-xl font-bold text-white">
                {active.label ? `${active.label} ${kind}` : `Sunday ${kind}`} — {active.date}
              </p>
              <p className="text-sm md:text-base text-white/65 mt-1 max-w-2xl">
                {kind === "Sermon"
                  ? `Sermon from Pastor Tony Redmon at New Life Assembly of God in Leitchfield, Kentucky, recorded ${active.date}.`
                  : `Sunday morning worship with the New Life Assembly of God church family in Leitchfield, Kentucky, recorded ${active.date}.`}
              </p>
            </figcaption>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 md:mt-10">
          <VideoRail
            videos={videos}
            activeId={active.id}
            playing={isPlaying}
            onSelect={(id) => {
              setIsPlaying(false);
              setActiveId(id);
            }}
            kind={kind}
          />
        </div>
      </div>
    </section>
  );
}
