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

EXPOSE 3000
CMD ["node", "dist/main.js"]