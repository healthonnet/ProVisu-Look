'use strict';

/**
 * Store the original layout.
 */
var noParse = window.localStorage.getItem('noParse') || false;
if (!noParse) {
  window.localStorage.setItem('hash', document.documentElement.innerHTML);
}

/**
 * Propagate preferences
 */
var alterStyle = window.localStorage.getItem('alter-style');
if (alterStyle) {
  var options = {
    document: document,
  };
  parse(options);
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
  var noParse = window.localStorage.getItem('noParse') || false;
  if (!noParse) {
    document.documentElement.innerHTML = window.localStorage.getItem('hash');
  }
  window.localStorage.removeItem('alter-style');
  window.localStorage.removeItem('hideImage');
}

/**
 * Alter the layout toward visually impaired style
 */
function alter(document, style, options) {
  options = options || {};
  options.noParse = options.noParse || false;
  var alterStyle = window.localStorage.getItem('alter-style');
  if (options.noParse) {
    window.localStorage.setItem('noParse', true);
  }
  if (!options.noParse && !alterStyle) {
    options.document = document;
    parse(options);
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

/**
 * Parse a document and sanitize it.
 * options: {
 *   document:
 *   alt:
 *   proxy:
 * }
 */
function parse(options) {
  options = options || {};

  // If no document is provided, we can't do anything.
  if (!options.document) {
    throw new Error('No document to parse.');
  }

  // Insertion of lunette toolbar
  options.toolbar = options.toolbar || false;

  // Default alt title.
  options.alt = options.alt || 'alt:';

  // Proxy domain.
  options.proxy = options.proxy || false;

  // Full output
  options.full = options.full || false;

  // Dist server address.
  options.dist =
    options.dist || window.location.protocol + '//' + window.location.hostname;

  var clean = sanitizeHtml(options.document.documentElement.innerHTML, {
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
        var src = attribs.src;
        // PROXY IMG
        // if (options.proxy) {
        //   var distSrc = url.parse(attribs.src);
        //   src = options.proxy + distSrc.path;
        // }
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
          text: '<img src="' + src + '" alt="' + attribs.alt + '" />' +
            alt,
        };
      },
    },
  });

  var toolbar = '';
  if (options.toolbar) {
    toolbar =
      '<ul class="sidebox sidebox-horizontal">' +
      '<li>' +
      '<a href="#" id="default">' +
      '<div class="item item-normal">' +
      '<i class="fa fa-eye" aria-hidden="true"></i>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '<li>' +
      '<a href="#" id="normal">' +
      '<div class="item item-normal">' +
      '<i class="fa fa-low-vision" aria-hidden="true"></i>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '<li>' +
      '<a href="#" id="black">' +
      '<div class="item item-black">' +
      '<i class="fa fa-low-vision" aria-hidden="true"></i>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '<li>' +
      '<a href="#" id="blue">' +
      '<div class="item item-blue">' +
      '<i class="fa fa-low-vision" aria-hidden="true"></i>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '<li>' +
      '<a href="#" id="cyan">' +
      '<div class="item item-cyan">' +
      '<i class="fa fa-low-vision" aria-hidden="true"></i>' +
      '</div>' +
      '</a>' +
      '</li>' +
      '</ul>' +
      '<ul class="sidebox sidebox-horizontal">' +
      '<li>' +
      '<a href="#" id="smaller">' +
      '<div class="item item-normal">A-</div>' +
      '</a>' +
      '</li>' +
      '<li>' +
      '<a href="#" id="bigger">' +
      '<div class="item item-normal">A+</div>' +
      '</a>' +
      '</li>' +
      '</ul>';
  }

  var output = clean;
  if (!options.full) {
    output = '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<title>' + options.document.getElementsByTagName('title')[0].innerHTML +
    '</title>' +
    '</head>' +
    toolbar +
    '<body id="ext-provisu">' +
    '<div id="ext-provisu-inner"><div>' +
    clean + '</div></div>' +
    '</body>' +
    '</html>';
  }
  options.document.documentElement.innerHTML = output;
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
