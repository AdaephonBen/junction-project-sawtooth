FROM mhart/alpine-node:9

# If possible, run your container using `docker run --init`
# Otherwise, you can use `tini`:
# RUN apk add --no-cache tini
# ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app
COPY . .
RUN rm -rf "node_modules"

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python3

RUN apk add --no-cache gcc python3 make g++ python bash file libunwind libunwind-dev

RUN npm ci --prod
EXPOSE 3000

RUN node init.js
# CMD ["node", "index.js", "register_event", "--id", "UP32CE6780", "--latitude", "26.83", "--longitude", "80.06", "--orientation", "270", "--metadata", "person fall down"]
CMD ["node", "index.js", "get_event", "--id", "UP32CE6780"]
