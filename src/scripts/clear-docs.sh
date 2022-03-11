#!/usr/bin/env bash
# filename: clean-lib.sh

current="$(pwd)/docs"
echo $current

if [ -d "$current" ]
then
    echo "El directorio con los documentos existe."
    rm -rf "$current"
    echo "y ya no está..."
else
    echo "El directorio con los documentos no existe."
fi