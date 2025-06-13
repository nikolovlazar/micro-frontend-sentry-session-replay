# Sentry Setup in Micro Frontend (single-spa) Projects

This document highlights how to set up Sentry in a micro frontend architecture (using single-spa) and what is required to ensure Sentry Session Replay works.

## Sentry Setup in Micro Frontends

- **Single Initialization:**

  - Sentry should be initialized only in the root-config, not in individual micro frontend modules.

- **Custom Transport for Multi-Project Routing:**

  - Use a custom multiplexed transport to route events to the correct Sentry project. Each module injects its own metadata (like DSN and release) into stack frames via Webpack plugins.
  - The root-config's `beforeSend` function extracts this metadata and attaches it to the event's extras, which the custom transport uses to route the event.

- **Integrations:**

  - Use `moduleMetadataIntegration()`, `browserTracingIntegration()`, and `replayIntegration()`.

- **Sampling:**
  - Set `tracesSampleRate`, `replaysSessionSampleRate`, and `replaysOnErrorSampleRate` as needed (often 1.0 for full capture in development).

## Making Sentry Session Replay Work

Sentry Session Replay requires a background worker to compress and upload session recordings. Browsers enforce Content Security Policy (CSP), which can block this worker unless explicitly allowed.

### Required CSP Configuration

Add the following directive to your CSP:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="... worker-src 'self' blob:' ..."
/>
```

- `'self'` allows workers from your own origin.
- `blob:` allows workers created from blob URLs (required for Sentry Session Replay).

**Without this directive, Session Replay will not work, as the browser will block the background worker needed for recording compression and upload.**

---

For more details, see:

- [Sentry JavaScript SDK Docs](https://docs.sentry.io/platforms/javascript/)
- [Content Security Policy (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
