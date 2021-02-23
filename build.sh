#!/usr/bin/env bash

cd "$(dirname "$0")"

rm -rf ./vendor
mkdir -p ./vendor

git clone git@github.com:googleapis/googleapis.git
cp -R googleapis/google ./vendor/google
rm -rf googleapis

git clone git@github.com:envoyproxy/data-plane-api.git
cp -R data-plane-api/envoy ./vendor/envoy
rm -rf data-plane-api

git clone git@github.com:envoyproxy/protoc-gen-validate.git
cp -R protoc-gen-validate/validate ./vendor/validate
rm -rf protoc-gen-validate

git clone git@github.com:cncf/udpa.git
cp -R udpa/udpa ./vendor/udpa
rm -rf udpa

bash ./gen.sh