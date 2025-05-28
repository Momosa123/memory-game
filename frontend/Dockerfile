FROM node:20-alpine

WORKDIR /app

# Installe pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY .env.docker .env
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]