FROM node:10

RUN mkdir /src
WORKDIR /src

COPY . .

RUN rm -rf "node_modules"

RUN npm ci --prod
EXPOSE 4004
CMD ["node","index.js"]
#CMD ["node", "index.js", "register_event", "--id", "UP32CE6780", "--latitude", "26.83", "--longitude", "80.06", "--orientation", "270", "--metadata", "person fall down"]
