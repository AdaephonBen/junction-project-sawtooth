FROM node:10

RUN mkdir /src
WORKDIR /src

COPY . .

RUN rm -rf "node_modules"

RUN npm ci --prod
EXPOSE 4004
CMD ["node","index.js"]
