!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);var o=["#16a085","#27ae60","#2c3e50","#f39c12","#e74c3c","#9b59b6","#FB6964","#342224","#472E32","#BDBB99","#77B1A9","#73A857"],r=document.getElementById("generate-random-quote-button"),u=document.getElementById("tweet-button"),c=document.getElementById("quote"),i=document.getElementById("author"),a=function(e){var t=e;t.length>140&&(t="".concat(e.substring(0,137),"..."));var n=encodeURI(t);u.setAttribute("href","https://twitter.com/intent/tweet/?text=".concat(n))},l=function(e,t){c.innerText='"'.concat(e,'"'),i.innerText=t},f=function(){fetch("https://api.quotable.io/random").then(function(e){return e.json()}).then(function(e){var t;l(e.content,e.author),t=Math.floor(Math.random()*o.length),document.body.style.backgroundColor=o[t],a(e.content)}).catch(function(e){console.error(e),l("There seems to be an issue. Check the console for more details.",""),a("Checkout arvindsuresh.in")})};r.addEventListener("click",f),window.onload=f()},function(e,t,n){}]);