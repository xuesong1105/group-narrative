FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
ENV PORT=43129
EXPOSE 43129
CMD ["node", "--experimental-strip-types", "--disable-warning=ExperimentalWarning", "server/index.ts"]
