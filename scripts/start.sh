#!/bin/bash
set -e
source `pwd`/.env
npx nodemon --watch $1 --ext ts --exec "`pwd`/scripts/build.sh $1 || exit 1"
