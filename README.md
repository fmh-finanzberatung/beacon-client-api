# A browser API for the beacon logger

## Installation

add this line to your package.json devDependencies:

"beaconClientApi": "https://github.com/fmh-finanzberatung/beacon.git#v0.0.2"

Please check for the latest updates. This is not an npm registry entry.

## Access logging

import { logAccess } from 'beaconClientAPI';

invoke only once per page or router view instance:

logAccess();

## Error logging

import { logError } from 'beaconClientAPI';

The following properties should get assigned when the logError function is being invoked: 


```logError({
  name: "Preferably use the Error name of the error Object, if available",  
  message: "Preferably use the Error message of the error Object, if
  available",
  line: "Error line, if available",
  stack: "The full error stack, ",
  customAnnotation: "An explanation and/or further details",
  customErrorKey: "an error key for classifying the error situation like 'georg-form-error' or 'kian-login-failure",
});```

None of these Properties is mandatory. So, you're free to deviate from the
proposals above.
