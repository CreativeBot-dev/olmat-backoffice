# Tahap dasar
FROM node:20.17.0 AS base

# Tahap build
FROM base AS builder
WORKDIR /app
COPY . .
# Instal dependensi dan build aplikasi
# Salin .env jika diperlukan ( uncomment jika .env.example ada)
# RUN cp .env.example .env && yarn install && yarn build

# Tahap produksi
FROM base AS prod
WORKDIR /app
# Salin output build dan dependensi dari tahap builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
# Salin .env jika diperlukan
COPY --from=builder /app/.env .env
EXPOSE 3002
CMD ["yarn", "start"]