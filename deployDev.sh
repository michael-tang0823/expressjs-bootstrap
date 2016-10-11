#!/usr/bin/env bash
cp ./manifest.dev.yml ./manifest.yml

bluemix api https://api.ng.bluemix.net

bluemix login -u loginUser -o loginOrg -s dev

cf push bootstrap-dev