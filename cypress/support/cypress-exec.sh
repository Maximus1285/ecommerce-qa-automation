#!/bin/bash -ex

attempts=0
runtime="5 minute"
endtime=$(date -ud "$runtime" +%s)
STATUS=1

call_app() {
    curl -I http://wordpress | grep HTTP &>/dev/null; STATUS="$?"
}

call_app

while [[ $STATUS != 0 && $(date -u +%s) -le $endtime ]]
do
    echo "The app is still not ready."
    echo "Retrying..."
    sleep 10
    call_app
done

if [[ $STATUS != 0 ]]
then
    echo "The app was not ready after $attempts attempts"
    echo "Finishing"
fi

if [[ $STATUS == 0 ]]
then
    echo "The app is ready to be used!!"
fi

yarn

echo "yarn cy:run:chrome"
yarn cy:run:chrome
