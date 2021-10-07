export default function logError(error) {
  console.log('error', error);

  if (!error || !Object.keys(error).length) {
    console.warn(
      'logError utility function expects an error object with these properties:\nname, message, line, stack, customAnnotation, customErrorKey'
    );
  }

  const apiPath = '/api/public/errors';
  //console.log('error', error);

  console.log('apiPath', apiPath);

  const beaconUrl = document.location.hostname.match(/devel|local/)
    ? 'http://localhost:3006' + apiPath
    : 'https://beacon.fmh.de' + apiPath;

  console.log('logError beaconUrl:', beaconUrl);

  const occuredAt = Date.now();
  const na = '-';
  const errorData = JSON.stringify({
    url: document.location.href,
    name: error.name || na,
    message: error.message || na,
    line: error.line || na,
    stack: error.stack || na,
    customAnnotation: error.stack || na,
    customErrorKey: error.stack || na,
    date: new Date(occuredAt).toUTCString(),
  });

  const req = new XMLHttpRequest();

  req.error = function error(err) {
    console.error(err);
  };

  req.readystatechange = function readystatechange() {
    console.log('XMLHttpRequest.readyState', XMLHttpRequest.readyState);
  };

  req.open('post', beaconUrl, true);
  console.log('errorData', errorData);
  req.send(errorData);
}
