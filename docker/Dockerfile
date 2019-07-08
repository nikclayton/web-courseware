FROM silex/emacs:26.3-alpine-dev
LABEL maintainer="Nik Clayton"

RUN apk add --no-cache \
  ca-certificates \
  inotify-tools \
  chromium \
  graphviz

COPY Cask /root/Cask
RUN cd /root && cask install

COPY org-re-reveal-export-to-html.sh /root