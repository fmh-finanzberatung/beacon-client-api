var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function o(){let e=function(){const e=document.cookie.split(";"),t={};for(let o=0,n=e.length;o<n;o++){const n=e[o].split("=");t[n[0]]=n[1]}return t}()["fmh-beacon-key"];if(!e){e=localStorage.getItem("fmh-beacon-key")||localStorage.getItem("fmh-beacon-key")||(window.crypto?([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)})):"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})));const t=function(){const e=(new Date).getTime()+31536e6,t=new Date(e).toUTCString();return console.log("utcString",t),t}(),o="fmh-beacon-key="+e+";expires="+t+";path=/;domain=fmh.de;secure";document.cookie=o}const t=Date.now(),o="/api/public/beacons";!function(e,t){const o=new XMLHttpRequest;o.error=function(e){console.error(e)},o.readystatechange=function(){console.log("XMLHttpRequest.readyState",XMLHttpRequest.readyState)},o.open("post",e,!0),o.send(t)}(document.location.hostname.match(/devel|localhost/)?"http://localhost:3006"+o:"https://beacon.fmh.de"+o,function(t){const o=Date.now();return JSON.stringify({beaconKey:e,date:new Date(t).toUTCString(),duration:o-t,protocol:window.location.protocol.replace(":",""),host:window.location.hostname,port:window.location.port,path:window.location.pathname,query:window.location.search,referrer:document.referrer,userAgent:navigator.userAgent})}(t))}function n(e){console.log("error",e),e&&Object.keys(e).length||console.warn("logError utility function expects an error object with these properties:\nname, message, line, stack, customAnnotation, customErrorKey");const t="/api/public/errors";console.log("apiPath",t);const o=document.location.hostname.match(/devel|local/)?"http://localhost:3006"+t:"https://beacon.fmh.de"+t;console.log("logError beaconUrl:",o);const n=Date.now(),r="-",a=JSON.stringify({url:document.location.href,name:e.name||r,message:e.message||r,line:e.line||r,stack:e.stack||r,customAnnotation:e.stack||r,customErrorKey:e.stack||r,date:new Date(n).toUTCString()}),c=new XMLHttpRequest;c.error=function(e){console.error(e)},c.readystatechange=function(){console.log("XMLHttpRequest.readyState",XMLHttpRequest.readyState)},c.open("post",o,!0),console.log("errorData",a),c.send(a)}e.d(t,{B:()=>o,H:()=>n});var r=t.B,a=t.H;export{r as logAccess,a as logError};