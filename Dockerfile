# 1단계: Node.js 환경에서 애플리케이션 빌드
# Node.js의 경량 Alpine 이미지를 사용하여 빌드 환경을 설정
FROM node:20-alpine 

# 작업 디렉토리를 /app으로 설정
WORKDIR /app
# package.json과 package-lock.json을 도커 이미지의 /app 디렉토리로 복사
COPY package.json pnpm-lock.yaml ./ 

#pnpm 설치
RUN npm install -g pnpm 

# 의존성을 설치
RUN pnpm install 
# 모든 소스 파일을 도커 이미지의 /app 디렉토리로 복사
COPY . . 
# Next.js 애플리케이션을 빌드 (정적 파일이 .next 디렉토리에 생성됨)
RUN pnpm build  

CMD ["pnpm", "start"]  

