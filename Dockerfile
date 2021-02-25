FROM node:14-alpine as dependencies
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-log.json package-lock.json
RUN npm ci --production && \
    mv node_modules ../prod_node_modules && \
    npm ci

FROM dependencies as development
COPY . .
CMD npm run start:dev

FROM dependencies as builder
COPY . .
RUN npm run build

FROM node:14-alpine as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist dist
COPY --from=dependencies /usr/src/app/package.json package.json
COPY --from=dependencies /usr/src/app/package-lock.json package-lock.json
COPY --from=dependencies /usr/src/prod_node_modules ./node_modules
COPY vendor vendor
CMD ["node", "dist/main.js"]