FROM node:10
# If possible, run your container using `docker run --init`
# Otherwise, you can use `tini`:
# RUN apk add --no-cache tini
# ENTRYPOINT ["/sbin/tini", "--"]

RUN mkdir /app
WORKDIR /app
COPY . .
RUN rm -rf "node_modules"

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python3

RUN npm ci --prod
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg libsm6 libxext6 && \
    rm -rf /var/lib/apt/lists/*

RUN ["node", "init.js"]
RUN ["python3", "-m", "pip", "install", "--upgrade", "pip"]
RUN ["python3", "-m", "pip", "install", "requests"]
RUN usermod -a -G video root

ENTRYPOINT ["tail", "-f", "/dev/null"]
# CMD ["node", "index.js", "register_event", "--id", "UP32CE6780", "--latitude", "26.83", "--longitude", "80.06", "--orientation", "270", "--metadata", "person fall down"]
# CMD ["node", "index.js", "get_event", "--id", "UP32CE6780"]
