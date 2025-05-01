# auto-generated Dockerfile
FROM node:22-alpine AS build

WORKDIR /build

COPY package.json package-lock.json* /build/
RUN npm install

COPY ./src /build

RUN npm run build

FROM node:22-alpine AS prod

WORKDIR /app

COPY --from=build /build/dist /app/dist
ENV NODE_ENV=production
CMD ["node", "/app/dist/index.js"]