import type { NextConfig } from "next";
import { withMicrofrontends } from "@vercel/microfrontends/next/config";

const nextConfig: NextConfig = {
  basePath: "/yeon",
};

export default withMicrofrontends(nextConfig);
