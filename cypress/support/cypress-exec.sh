#!/bin/bash -ex

yarn

echo "yarn cy:run-headless:chrome"
yarn cy:run-headless:chrome
