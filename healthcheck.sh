#!/usr/bin/env sh
# Poll the served page until nginx answers, for use as a container healthcheck.
PORT="${PORT:-80}"
TRIES="${TRIES:-30}"

i=0
while [ $i -lt $TRIES ]; do
  if curl -sf "http://localhost:$PORT/" > /dev/null; then
    echo "ok"
    exit 0
  fi
  i=$((i + 1))
  sleep 1
done

echo "clock page did not respond on port $PORT after $TRIES tries"
exit 1
