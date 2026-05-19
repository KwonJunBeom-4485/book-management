import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://book-management-backend-prod7.eba-kmkmemq9.ap-northeast-2.elasticbeanstalk.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;