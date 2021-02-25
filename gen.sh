#!/usr/bin/env bash

cd "$(dirname "$0")"

ROOT="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
VENDOR=${ROOT}/vendor

protoc=$(which protoc)

PROTOC_PLUGIN_PATH="./node_modules/.bin/protoc-gen-ts_proto"

TS_PROTO_OUT_DIR="${ROOT}/src/types"

AUTH_VERSIONS=(
    "v2"
)

rm -rf ${TS_PROTO_OUT_DIR}
mkdir -p ${TS_PROTO_OUT_DIR}

for AUTH_VERSION in "${AUTH_VERSIONS[@]}"
do
    protoc \
    --plugin=${PROTOC_PLUGIN_PATH} \
    --ts_proto_out=${TS_PROTO_OUT_DIR} \
    --proto_path=${VENDOR} \
    --ts_proto_opt=nestJs=true,addNestjsRestParameter=true,addGrpcMetadata=true,useOptionals=true,outputEncodeMethods=true \
    ${VENDOR}/envoy/service/auth/${AUTH_VERSION}/external_auth.proto
done
