FROM caddy:2.8-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html i18n.js /srv/
COPY img /srv/img
COPY video /srv/video
