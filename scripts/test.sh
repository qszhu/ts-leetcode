set -e
source `pwd`/.env
find src -type d -depth 1 -print0 | xargs -0 -n1 `pwd`/scripts/build.sh
