#!/bin/bash -

SCRIPTDIR=$(dirname -- "$(readlink -f "${BASH_SOURCE}")")
source $SCRIPTDIR/config.sh

# uncomment and set if the port is not detected automatically
#export BLUE_OWL_SERIAL_PORT=COM6

npm run ts build-it-yourself/scripts/jury-3.ts