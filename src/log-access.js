export default function logAccess() {
  function mapCookies() {
    const splitted = document.cookie.split(';');
    const result = {};
    for (let i = 0, l = splitted.length; i < l; i++) {
      const splittedItem = splitted[i].split('=');
      result[splittedItem[0]] = splittedItem[1];
    }
    return result;
  }

  function uuidv4Math() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  function uuidv4Crypto() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16);
    });
  }

  function generateBeaconKey() {
    // if there is a key in localStorage reuse it
    const beaconStorageKey = localStorage.getItem('fmh-beacon-key');
    if (beaconStorageKey) return beaconStorageKey;
    if (window.crypto) {
      return uuidv4Crypto();
    }
    return uuidv4Math();
  }

  function createExpirationDate() {
    const date = new Date();
    const expiration = date.getTime() + 365 * 24 * 60 * 60 * 1000;
    const expDate = new Date(expiration);
    const utcString = expDate.toUTCString();
    console.log('utcString', utcString);
    return utcString;
  }

  function sendSignal(beaconUrl, infoData) {
    const req = new XMLHttpRequest();

    req.error = function error(err) {
      console.error(err);
    };

    req.readystatechange = function readystatechange() {
      console.log('XMLHttpRequest.readyState', XMLHttpRequest.readyState);
    };

    req.open('post', beaconUrl, true);
    //req.setRequestHeader('Content-Type', 'text');
    req.send(infoData);
  }

  /* start checking */

  const cookiesMap = mapCookies();
  let beaconCookieKey = cookiesMap['fmh-beacon-key'];

  if (!beaconCookieKey) {
    // in case user is on www fmh.de and already has a key
    beaconCookieKey =
      localStorage.getItem('fmh-beacon-key') || generateBeaconKey();
    const expirationDate = createExpirationDate();
    const cookieString =
      'fmh-beacon-key=' +
      beaconCookieKey +
      ';' +
      'expires=' +
      expirationDate +
      ';' +
      'path=/;domain=fmh.de;secure';
    document.cookie = cookieString;
  }

  function info(openedAt) {
    const closedAt = Date.now();
    const s = JSON.stringify({
      beaconKey: beaconCookieKey,
      date: new Date(openedAt).toUTCString(),
      duration: closedAt - openedAt,
      protocol: window.location.protocol.replace(':', ''),
      host: window.location.hostname,
      port: window.location.port,
      path: window.location.pathname,
      query: window.location.search,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    });
    return s;
  }

  const pageOpenedAt = Date.now();
  const apiPath = '/api/public/beacons';
  const beaconUrl = document.location.hostname.match(/devel|localhost/)
    ? 'http://localhost:3006' + apiPath
    : 'https://beacon.fmh.de' + apiPath;

  const infoData = info(pageOpenedAt);
  sendSignal(beaconUrl, infoData);
}
