import type { NextConfig } from "next";
import { withMicrofrontends } from "@vercel/microfrontends/next/config";

const nextConfig: NextConfig = {
  basePath: "/yeon",
  allowedDevOrigins: ["127.0.0.1"],
};

export default withMicrofrontends(nextConfig);
