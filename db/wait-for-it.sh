#!/usr/bin/env bash
# wait-for-it.sh: Wait for a service to be available before continuing

# usage: wait-for-it.sh host:port [-t timeout] [-- command ...]

TIMEOUT=15
QUIET=0
HOST=""
PORT=""
CMD=()

while [[ $# -gt 0 ]]; do
    case "$1" in
        *:* )
            HOST=$(echo "$1" | cut -d : -f 1)
            PORT=$(echo "$1" | cut -d : -f 2)
            shift 1
            ;;
        -t )
            TIMEOUT="$2"
            shift 2
            ;;
        -- )
            shift
            CMD=("$@")
            break
            ;;
        -q | --quiet )
            QUIET=1
            shift 1
            ;;
        * )
            echo "Unknown argument: $1"
            exit 1
            ;;
    esac
done

# Validate input
if [ -z "$HOST" ] || [ -z "$PORT" ]; then
    echo "Usage: $0 host:port [-t timeout] [-- command ...]"
    exit 1
fi

# Check if the service is up
echo "Waiting for $HOST:$PORT..."
START=$(date +%s)
while ! nc -z $HOST $PORT; do
    if [ $(($(date +%s) - $START)) -gt $TIMEOUT ]; then
        echo "Timed out waiting for $HOST:$PORT"
        exit 1
    fi
    sleep 1
done

echo "$HOST:$PORT is available"

# If a command was passed, execute it
if [ ${#CMD[@]} -gt 0 ]; then
    exec "${CMD[@]}"
fi
