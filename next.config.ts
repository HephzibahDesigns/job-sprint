import { join } from "path";

const nextConfig = {
  turbopack: {
    root: join(__dirname), // makes it absolute
  },
};

export default nextConfig;
