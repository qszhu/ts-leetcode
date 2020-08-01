#!/bin/bash
set -e

# typescrpt -> javascript
npx tsc -p $1

# minify
if [ "$MINIFY" = true ] ; then
  npx terser $1/solution.js --config-file minify.json --output $1/solution.js
fi

# obfuscate
if [ "$OBFUSCATE" = true ] ; then
  npx javascript-obfuscator $1/solution.js --config javascript-obfuscator.json --output $1/solution.js 
fi

# test
npx mocha -r ts-node/register $1/**/*.spec.ts
