# System image
FROM node:10.5.0-alpine AS system

MAINTAINER Damien Jarry <damien.jarry@salade2chats.com>
LABEL version="1.0.0" \
      description="System for build & run BumbleBot"

ENV USER node
ARG UID=1000
ARG GID=1000

RUN echo '@edge http://nl.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories \
  && echo '@testing http://nl.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories \
  && apk add --no-cache apk-tools@edge \
  && apk add --no-cache gosu@testing \
  && chmod +s /usr/bin/gosu

COPY docker/fixuid /usr/bin/fixuid
RUN /usr/bin/fixuid ${UID} ${GID}

RUN echo -e '#!/bin/sh\nwhoami' > /usr/bin/entrypoint && \
  chmod a+x /usr/bin/entrypoint

RUN mkdir -p /data && chown -R node: /data

WORKDIR /data

USER node


# Build image
FROM system AS build

COPY --chown=node:node . /data

RUN yarn install \
  && yarn run build-ts

VOLUME /data
VOLUME /data/node_modules
VOLUME /data/build

# Run image
