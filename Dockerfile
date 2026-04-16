# إنتاج: Express يخدم /api و dist معًا (لا تستخدم serve وحده).
FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# مرّر من Dokploy كـ Build Arguments إن احتجت قيمًا مضمّنة في الواجهة
ARG VITE_WEB_APP_URL=
ARG VITE_ADMIN_APP_URL=
ARG VITE_API_BASE_URL=
ENV VITE_WEB_APP_URL=$VITE_WEB_APP_URL \
    VITE_ADMIN_APP_URL=$VITE_ADMIN_APP_URL \
    VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
