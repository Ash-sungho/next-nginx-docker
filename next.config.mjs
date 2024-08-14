/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'scontent-muc2-1.cdninstagram.com',
      'instagram.fraj3-3.fna.fbcdn.net',
    ], // 외부 도메인 추가
  },
}

export default nextConfig
