# 1단계: Node.js 환경에서 애플리케이션 빌드
# Node.js의 경량 Alpine 이미지를 사용하여 빌드 환경을 설정
FROM node:20-alpine AS builder 

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

# 2단계: Nginx로 정적 파일 제공
# Nginx의 경량 Alpine 이미지를 사용하여 배포 환경 설정
FROM nginx:alpine  
# 빌드된 파일을 Nginx의 기본 루트 디렉토리로 복사
COPY --from=builder /app/out /usr/share/nginx/html  
# public 폴더의 파일들도 Nginx 루트 디렉토리로 복사
COPY --from=builder /app/public /usr/share/nginx/html  
# Nginx 설정 파일을 도커 이미지 내에 복사
COPY nginx.conf /etc/nginx/nginx.conf  
# 컨테이너가 80 포트를 외부에 노출하도록 설정
EXPOSE 80  
# Nginx를 실행시키는 명령어, 데몬 모드를 비활성화하여 포그라운드에서 실행
CMD ["nginx", "-g", "daemon off;"]  