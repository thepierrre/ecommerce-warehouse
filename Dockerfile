FROM node:22.16.0-alpine3.22 AS base
WORKDIR /app

# Enable pnpm through Corepack
RUN corepack enable

# ------------------------------------------------------------------------------
# Dependencies stage (all deps for building)
# ------------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY .npmrc .npmrc
RUN pnpm install --frozen-lockfile

# ------------------------------------------------------------------------------
# Production-only deps stage
# ------------------------------------------------------------------------------
FROM base AS production-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY .npmrc .npmrc
RUN pnpm install --frozen-lockfile --prod

# ------------------------------------------------------------------------------
# Build stage
# ------------------------------------------------------------------------------
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.pnpm ./.pnpm
COPY --from=deps /app/.npmrc .npmrc
COPY . .
RUN node ace build --production

# ------------------------------------------------------------------------------
# Production image
# ------------------------------------------------------------------------------
FROM base
ENV NODE_ENV=production
WORKDIR /app

# Production dependencies only
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=production-deps /app/.pnpm ./.pnpm

# Copy built app
COPY --from=build /app/build ./build

EXPOSE 8080
CMD ["node", "./build/server.js"]
