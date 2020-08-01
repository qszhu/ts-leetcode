#!/bin/bash
set -e
source `pwd`/.env
npx hygen $1 with-prompt
