#!/bin/bash
rm `which tslc` && npm run build && cp -r templates dist && npm link
