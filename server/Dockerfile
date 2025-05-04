# auto-generated Dockerfile
FROM node:22-alpine AS build

WORKDIR /build

COPY package*.json tsconfig.json /build/

RUN npm ci

COPY ./src /build/src

RUN npm run build

FROM node:22-alpine AS prod


WORKDIR /app

COPY --from=build /build/dist ./dist
COPY --from=build /build/package.json ./package.json
COPY --from=build /build/package-lock.json ./package-lock.json

RUN npm ci

ENV NODE_ENV=production
ENV DB_HOST=testserver1047.database.windows.net
ENV DB_PORT=1433
ENV DB_NAME=testdb2
ENV DB_USER=useradmin
ENV DB_PASS=YS7hudud7SG3UJS

EXPOSE 3000
CMD ["node", "dist/main.js"]