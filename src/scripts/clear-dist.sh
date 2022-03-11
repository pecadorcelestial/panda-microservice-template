#!/usr/bin/env bash
# filename: clean-lib.sh

current="$(pwd)/dist"
echo $current

if [ -d "$current" ]
then
    echo "DIST folder exists..."
    rm -rf "$current"
    echo "no more ò_ó..."
else
    echo "DIST folder does not exists... good..."
fi