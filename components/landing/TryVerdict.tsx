'use client';

import { useState, type FormEvent } from 'react';

import SectionHeading from './SectionHeading';
import SectionKicker from './SectionKicker';

// TODO: migrate to NEXT_PUBLIC_API_URL once env-var pattern is established repo-wide.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.xolto.app';

const EUR_TO_BGN = 1.9558;

const OLX_BG_PATTERN = /(^|\.)olx\.bg(\/|$)/i;

type Verdict = 'buy' | 'negotiate' | 'ask_seller' | 'skip';

// Wire shape from POST /public/matches/analyze (markt). Listing fields are PascalCase Go-style;
// FairPrice / OfferPrice are euro-cents.
type AnalyzeWire = {
  listing?: {
    Score?: number;
    FairPrice?: number;
    OfferPrice?: number;
    Reason?: string;
    RiskFlags?: string[];
    RecommendedAction?: Verdict | string;
  };
};

// Display shape consumed by VerdictResult; prices already in whole euros.
type ScoredListing = {
  verdict: Verdict;
  score: number;
  fairPrice?: number;
  suggestedOffer?: number;
  riskFlags?: string[];
  reason?: string;
};

function normalizeAnalyzeResponse(wire: AnalyzeWire): ScoredListing {
  const l = wire.listing ?? {};
  const action = typeof l.RecommendedAction === 'string' ? l.RecommendedAction : 'skip';
  const verdict: Verdict =
    action === 'buy' || action === 'negotiate' || action === 'ask_seller' || action === 'skip'
      ? action
      : 'skip';
  const centsToEuro = (n: unknown): number | undefined =>
    typeof n === 'number' && Number.isFinite(n) && n > 0 ? Math.round(n / 100) : undefined;
  return {
    verdict,
    score: typeof l.Score === 'number' && Number.isFinite(l.Score) ? l.Score : 0,
    fairPrice: centsToEuro(l.FairPrice),
    suggestedOffer: centsToEuro(l.OfferPrice),
    riskFlags: Array.isArray(l.RiskFlags) ? l.RiskFlags : undefined,
    reason: typeof l.Reason === 'string' && l.Reason.length > 0 ? l.Reason : undefined,
  };
}

type ViewState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'result'; data: ScoredListing; sourceUrl: string }
  | { kind: 'error'; message: string };

const VERDICT_LABELS: Record<Verdict, string> = {
  buy: 'BUY',
  negotiate: 'NEGOTIATE',
  ask_seller: 'ASK SELLER',
  skip: 'SKIP',
};

// Reuses the existing Hero pill vocabulary (text-bright bg-bright/12) for the "buy" case;
// other verdicts use neutral/muted treatments built from the same brand/ink/white tokens.
const VERDICT_PILL_CLASS: Record<Verdict, string> = {
  buy: 'text-bright bg-bright/12',
  negotiate: 'text-[#f5b148] bg-[#f5b148]/12',
  ask_seller: 'text-ink/80 bg-white/8',
  skip: 'text-ink/40 bg-white/5',
};

function formatEurAndBgn(eur: number): string {
  const bgn = (eur * EUR_TO_BGN).toFixed(2);
  return `€${eur} (${bgn} лв.)`;
}

function isLikelyOlxBgUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return OLX_BG_PATTERN.test(u.hostname);
  } catch {
    return false;
  }
}

function pickPrice(data: ScoredListing): number | null {
  if (typeof data.fairPrice === 'number') return data.fairPrice;
  if (typeof data.suggestedOffer === 'number') return data.suggestedOffer;
  return null;
}

export default function TryVerdict() {
  const [url, setUrl] = useState('');
  const [view, setView] = useState<ViewState>({ kind: 'idle' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = url.trim();

    if (!trimmed) {
      setView({
        kind: 'error',
        message: "That doesn't look like an OLX.bg listing URL. Paste a link from olx.bg/d/obyavi/...",
      });
      return;
    }

    if (!isLikelyOlxBgUrl(trimmed)) {
      setView({
        kind: 'error',
        message: "That doesn't look like an OLX.bg listing URL. Paste a link from olx.bg/d/obyavi/...",
      });
      return;
    }

    setView({ kind: 'loading' });

    try {
      const res = await fetch(`${API_URL}/public/matches/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });

      if (res.ok) {
        const wire = (await res.json()) as AnalyzeWire;
        const data = normalizeAnalyzeResponse(wire);
        setView({ kind: 'result', data, sourceUrl: trimmed });
        return;
      }

      if (res.status === 429) {
        setView({
          kind: 'error',
          message: 'Too many tries from this network. Try again in a bit.',
        });
        return;
      }

      if (res.status === 503) {
        setView({
          kind: 'error',
          message:
            "We're at our daily limit for free verdicts. Try again tomorrow, or sign up for unlimited.",
        });
        return;
      }

      if (res.status === 400) {
        setView({
          kind: 'error',
          message:
            "That doesn't look like an OLX.bg listing URL. Paste a link from olx.bg/d/obyavi/...",
        });
        return;
      }

      setView({
        kind: 'error',
        message: "Couldn't reach the verdict engine right now. Try again in a moment.",
      });
    } catch {
      setView({
        kind: 'error',
        message: "Couldn't reach the verdict engine right now. Try again in a moment.",
      });
    }
  }

  const isLoading = view.kind === 'loading';
  const errorMessage = view.kind === 'error' ? view.message : null;

  return (
    <section
      id="try-verdict"
      className="landing-section-padding border-b border-brand/15"
      aria-labelledby="try-verdict-heading"
    >
      <div className="landing-section-wrap max-w-[1200px] mx-auto">
        <SectionKicker>Try it now</SectionKicker>
        <SectionHeading>
          Paste an OLX.bg link.
          <br />
          Get a verdict in seconds.
        </SectionHeading>
        <p className="text-ink/60 text-[1.05rem] leading-[1.7] max-w-[56ch] mb-8">
          Buy, Negotiate, Ask seller, or Skip — with a fair-price suggestion in BGN.
        </p>

        <div
          id="try-verdict-heading"
          className="bg-surface border border-brand/15 rounded-[20px] p-5 sm:p-7 max-w-[720px]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="try-verdict-url" className="sr-only">
              OLX.bg listing URL
            </label>
            <input
              id="try-verdict-url"
              type="url"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              placeholder="Paste an OLX.bg listing URL"
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={errorMessage ? 'try-verdict-error' : undefined}
              className="flex-1 min-h-[48px] px-4 rounded-full bg-surface2 border border-brand/15
                         text-ink placeholder:text-ink/40
                         focus:outline-none focus:border-bright focus:ring-2 focus:ring-bright/30
                         disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Analyzing…' : 'Get verdict'}
            </button>
          </form>

          {errorMessage && (
            <p
              id="try-verdict-error"
              role="alert"
              className="mt-3 text-[0.875rem] text-[#f5b148]"
            >
              {errorMessage}
            </p>
          )}

          <div className="mt-5">
            {view.kind === 'idle' && (
              <p className="text-[0.8125rem] text-ink/40">
                Anonymous, no signup. Free during the public preview.
              </p>
            )}

            {view.kind === 'loading' && <VerdictSkeleton />}

            {view.kind === 'result' && (
              <VerdictResult data={view.data} sourceUrl={view.sourceUrl} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function VerdictSkeleton() {
  return (
    <div
      className="bg-surface2 border border-brand/15 rounded-2xl p-[18px] animate-pulse"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-6 w-24 rounded-full bg-white/8" />
        <div className="h-6 w-12 rounded-full bg-white/5" />
        <div className="ml-auto h-6 w-32 rounded-full bg-white/5" />
      </div>
      <div className="h-3 w-3/4 rounded-full bg-white/5 mb-2" />
      <div className="h-3 w-2/3 rounded-full bg-white/5" />
    </div>
  );
}

function VerdictResult({ data, sourceUrl }: { data: ScoredListing; sourceUrl: string }) {
  const verdict: Verdict = data.verdict;
  const pillClass = VERDICT_PILL_CLASS[verdict] ?? VERDICT_PILL_CLASS.skip;
  const label = VERDICT_LABELS[verdict] ?? String(verdict).toUpperCase();
  const price = pickPrice(data);
  const flags = (data.riskFlags ?? []).slice(0, 3);
  const extraFlagCount = Math.max(0, (data.riskFlags ?? []).length - flags.length);
  const scoreText =
    typeof data.score === 'number' && Number.isFinite(data.score) ? data.score.toFixed(1) : null;

  return (
    <div className="bg-surface2 border border-brand/15 rounded-2xl p-[18px]" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2.5 mb-3">
        <span
          className={`text-[0.75rem] font-bold tracking-[0.06em] px-2.5 py-0.5 rounded-full ${pillClass}`}
        >
          {label}
        </span>
        {scoreText && <span className="text-[0.875rem] font-bold text-ink">{scoreText}</span>}
        {price !== null && (
          <span className="ml-auto text-[1rem] font-extrabold text-ink">
            {formatEurAndBgn(price)}
          </span>
        )}
      </div>

      {flags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {flags.map((flag) => (
            <span
              key={flag}
              className="text-[0.6875rem] font-semibold px-2 py-0.5 rounded-full bg-white/8 text-ink/70"
            >
              {flag}
            </span>
          ))}
          {extraFlagCount > 0 && (
            <span className="text-[0.6875rem] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-ink/50">
              +{extraFlagCount} more
            </span>
          )}
        </div>
      )}

      {data.reason && (
        <p className="text-[0.875rem] text-ink/60 leading-[1.6] mb-4">{data.reason}</p>
      )}

      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
      >
        Open on OLX.bg
      </a>
    </div>
  );
}
