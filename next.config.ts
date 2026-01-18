import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  // 修复工作区根目录问题，让Next.js使用正确的node_modules目录
  turbopack: {
    root: resolve(__dirname),
  },
};

export default nextConfig;
