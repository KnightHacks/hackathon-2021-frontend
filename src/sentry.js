import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export const setupSentry = (history) => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ["api.knighthacks.org"],
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
      }),
    ],
    environment: process.env.REACT_APP_CF_PAGES_BRANCH ?? process.env.NODE_ENV,
    release: process.env.REACT_APP_CF_PAGES_COMMIT_SHA,
    tracesSampleRate: 1.0,
    enabled: true,
    debug: true,
  });
};
