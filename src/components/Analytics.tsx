import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Vercel-hosted analytics and performance measurement require no keys or configuration.
export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
