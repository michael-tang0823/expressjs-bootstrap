#!/usr/bin/env bash
cp ./manifest.prod.yml ./manifest.yml

bluemix api https://api.ng.bluemix.net

bluemix login -u loginUser -o loginOrg -s prod

cf push bootstrap-prod