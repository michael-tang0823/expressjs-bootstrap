#!/usr/bin/env bash
cp ./manifest.test.yml ./manifest.yml

bluemix api https://api.ng.bluemix.net

bluemix login -u loginUser -o loginOrg -s test

cf push bootstrap-test