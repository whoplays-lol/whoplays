import type { NextConfig } from 'next'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  ...(isDev ? {} : { output: 'export' }),
  outputFileTracingRoot: path.join(__dirname, '../../'),
  ...(isDev && {
    async rewrites() {
      const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:5000'
      return [{ source: '/api/:path*', destination: `${backendUrl}/api/:path*` }]
    },
  }),
}

export default nextConfig
