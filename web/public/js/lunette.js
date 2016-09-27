'use strict';

/**
 * Store the original layout.
 */
window.localStorage.setItem('hash', document.documentElement.innerHTML);

/**
 * Propagate preferences
 */
var alterStyle = window.localStorage.getItem('alter-style');
if (alterStyle) {
  parse(document);
}
switch (alterStyle) {
  case 'normal': {
    toNormal(document);
    break;
  }
  case 'black': {
    toBlack(document);
    break;
  }
  case 'blue': {
    toBlue(document);
    break;
  }
  case 'cyan': {
    toCyan(document);
    break;
  }
}

/**
 * Return the layout to its original style.
 */
function unalter(document) {
  document.documentElement.innerHTML = window.localStorage.getItem('hash');
  window.localStorage.removeItem('alter-style');
  window.localStorage.removeItem('hideImage');
}

/**
 * Alter the layout toward visually impaired style
 */
function alter(document, style, options) {
  var alterStyle = window.localStorage.getItem('alter-style');
  if (!alterStyle) {
    parse(document, options);
  }
  switch (style) {
    case 'normal': {
      toNormal(document);
      break;
    }
    case 'black': {
      toBlack(document);
      break;
    }
    case 'blue': {
      toBlue(document);
      break;
    }
    case 'cyan': {
      toCyan(document);
      break;
    }
    case 'smaller': {
      if (!alterStyle) {
        toNormal(document);
      }
      smaller(document);
      break;
    }
    case 'bigger': {
      if (!alterStyle) {
        toNormal(document);
      }
      bigger(document);
      break;
    }
  }
}

/**
 * Styles functions
 */
function toNormal() {
  document.body.classList.add('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-cyan');
  window.localStorage.setItem('alter-style', 'normal');
  setFontSize();
}

function toBlack() {
  document.body.classList.add('ext-provisu-black');
  document.body.classList.remove('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-cyan');
  window.localStorage.setItem('alter-style', 'black');
  setFontSize();
}

function toBlue() {
  document.body.classList.add('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-cyan');
  window.localStorage.setItem('alter-style', 'blue');
  setFontSize();
}

function toCyan() {
  document.body.classList.add('ext-provisu-cyan');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-normal');
  window.localStorage.setItem('alter-style', 'cyan');
  setFontSize();
}

function smaller() {
  var el = document.body;
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style);
  setFontSize(fontSize - 5);
}

function bigger() {
  var el = document.body;
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style);
  setFontSize(fontSize + 5);
}

function setFontSize(size) {
  var el = document.body;
  var fontSize = window.localStorage.getItem('font-size');
  if (size) {
    el.style.fontSize = size + 'px';
  } else if (fontSize) {
    el.style.fontSize = fontSize + 'px';
    size = fontSize;
  } else {
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    fontSize = parseFloat(style);
    el.style.fontSize = fontSize + 'px';
    size = fontSize;
  }
  window.localStorage.setItem('font-size', size);
}

function parse(document, options) {
  options = options || {};
  if (!options.alt) {
    options.alt = 'alt:';
  }
  var base = document.URL;
  var clean = sanitizeHtml(document.documentElement.innerHTML, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'a', 'img', 'hr', 'br',
      'ul', 'ol', 'li',
      'b', 'strong', 'i', 'em',
      'header', 'footer',
      'input', 'select', 'button',
      'form',
    ],
    allowedAttributes: {
      a: [ 'href' ],
      img: [ 'src', 'alt' ],
      input: [
        'type', 'value', 'name', 'id', 'placeholder',
      ],
      button: [
        'type',
      ],
      form: [ 'action', 'method' ],
    },
    nonTextTags: [
      'style', 'script', 'textarea', 'noscript', 'head',
    ],
    transformTags: {
      img: function(tagName, attribs) {
        // TODO: fix hideImages
        // var hideImages = window.localStorage.getItem('hideImages');
        if (attribs.class && attribs.class.match(/hidden-xs/)) {
          return {
            tagName: 'span',
            text: '',
          };
        }
        var alt = attribs.alt ? options.alt + ' ' + attribs.alt : '';
        // TODO: fix hideImages
        // if (hideImages) {
        //   return {
        //     tagName: 'p',
        //     text: attribs.alt,
        //   };
        // }
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
    '<body id="ext-provisu">' +
    '<div id="ext-provisu-inner">' +
    clean + '</div>' +
    '</body>' +
    '</html>';
  document.documentElement.innerHTML = foo;
}

/**
 * Add click layers
 */
function boxify(document) {
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
}
