'use strict';

/**
 * Add click layers
 */
var box = '<div class="line-box">' +
  'Header' +
  '</div>';
if (document.getElementsByTagName('header').length > 0) {
  var header = document.getElementsByTagName('header')[0].innerHTML;
  document.getElementsByTagName('header')[0].innerHTML = box;
  document.getElementsByTagName('header')[0].addEventListener('click',
    function() {
      document.getElementsByTagName('header')[0].innerHTML = header;
    });
}

if (window.localStorage.getItem('altered')) {
  alter(document);
}

/**
 * Styles functions
 */
function toNormal() {
  document.body.classList.add('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-cyan');
}

function toBlack() {
  document.body.classList.add('ext-provisu-black');
  document.body.classList.remove('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-cyan');
}

function toBlue() {
  document.body.classList.add('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-cyan');
}

function toCyan() {
  document.body.classList.add('ext-provisu-cyan');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-normal');
}

function toSmallest() {
  var el = document.body;
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style);
  el.style.fontSize = (fontSize - 5) + 'px';
}

function toBigger() {
  var el = document.body;
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style);
  el.style.fontSize = (fontSize + 5) + 'px';
}

function alter(document) {
  var base = document.URL;
  var clean = sanitizeHtml(document.documentElement.innerHTML, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'a', 'img', 'hr', 'br',
      'ul', 'ol', 'li',
      'b', 'strong', 'i', 'em',
      'header', 'footer',
    ],
    allowedAttributes: {
      a: [ 'href' ],
      img: [ 'src', 'alt' ],
    },
    nonTextTags: [
      'style', 'script', 'textarea', 'noscript', 'head',
    ],
    transformTags: {
      img: function(tagName, attribs) {
        var alt = (attribs.alt) ? 'alt: ' + attribs.alt : '';
        return {
          tagName: 'p',
          text: '<img src="' + attribs.src + '" alt="' + attribs.alt + '" />' +
            alt,
        };
      },
    },
  });

  var foo = '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<title>' + document.getElementsByTagName('title')[0].innerHTML +
    '</title>' +
    '</head>' +
    '<body>' +
    '<div id="ext-provisu-inner">' +
    clean + '</div>' +
    '</body>' +
    '</html>';
  window.localStorage.setItem('hash', document.documentElement.innerHTML);
  document.documentElement.innerHTML = foo;
}

function unalter(document) {
  document.documentElement.innerHTML = window.localStorage.getItem('hash');
}
