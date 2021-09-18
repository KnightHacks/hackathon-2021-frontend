import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export const setupSentry = (history) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ["api.knighthacks.org"],
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
      }),
    ],
    environment: process.env.CF_PAGES_BRANCH ?? process.env.NODE_ENV,
    release: process.env.CF_PAGES_COMMIT_SHA,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.75 : 1,
    enabled: true,
  });
};
