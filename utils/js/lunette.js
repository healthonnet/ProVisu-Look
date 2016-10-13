'use strict';

// Definition of key value for options
var OPTIONS = 'hon-provisu-options';

// Definition of font size span
var FONT_SIZE_SPAN = 5;

// Alter document
alter(document, { toParse: true });

/**
 * Function alterStyle
 */
function alterStyle(document, style) {
  switch (style) {
    case 'normal': {
      return toNormal(document);
    }
    case 'black': {
      return toBlack(document);
    }
    case 'blue': {
      return toBlue(document);
    }
    case 'cyan': {
      return toCyan(document);
    }
  }
}

/**
 * Function alterFont
 * Change font size
 */
function alterFont(document, font) {
  if (font === 'smaller') {
    font = getFontSize(document) - FONT_SIZE_SPAN;
  }
  if (font === 'bigger') {
    font = getFontSize(document) + FONT_SIZE_SPAN;
  }
  return setFontSize(document, font);
}

/**
 * Return the layout to its original style.
 */
function unalter(document) {
  // Fetch options
  var options =
    JSON.parse(window.localStorage.getItem(OPTIONS)) || {};

  // If hash is defined, we revert to old style.
  if (options.hash) {
    document.documentElement.innerHTML = options.hash;
  }

  // Remove options
  window.localStorage.removeItem(OPTIONS);
}

/**
 * Alter the layout toward visually impaired style
 */
function alter(document, params) {

  // Fetch params and options
  params = params || {};
  var options =
    JSON.parse(window.localStorage.getItem(OPTIONS)) || {};

  // Define alt text
  params.alt = params.alt || 'alt: ';

  // Store site before parsing if not parsed already
  if (!options.parsed) {
    options.hash = document.documentElement.innerHTML;
  }

  // Option parse exists and set to true.
  // We render the page with previous options.
  params.parse = params.parse || options.parse;
  if (params.parse && (!options.parsed || params.toParse)) {
    // Parse document
    parse({
      document: document,
      alt: params.alt,
    });
    options.parse = true;
    options.parsed = true;
  }

  // Change style
  params.style = params.style || options.style;
  if (params.style) {
    options.style = alterStyle(document, params.style);
  }

  // Change font
  params.font = params.font || options.font;
  if (params.font) {
    options.font = alterFont(document, params.font);
  }

  // Store options modifications
  window.localStorage.setItem(OPTIONS, JSON.stringify(options));
}

/**
 * Styles functions
 */
function toNormal(document) {
  document.body.classList.add('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-cyan');
  return 'normal';
}

function toBlack(document) {
  document.body.classList.add('ext-provisu-black');
  document.body.classList.remove('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-cyan');
  return 'black';
}

function toBlue(document) {
  document.body.classList.add('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-normal');
  document.body.classList.remove('ext-provisu-cyan');
  return 'blue';
}

function toCyan(document) {
  document.body.classList.add('ext-provisu-cyan');
  document.body.classList.remove('ext-provisu-black');
  document.body.classList.remove('ext-provisu-blue');
  document.body.classList.remove('ext-provisu-normal');
  return 'cyan';
}

/**
 * Function getFontSize
 * calculate the fontsize of the document.
 */
function getFontSize(document) {
  var el = document.body;
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  return parseFloat(style);
}

function setFontSize(document, size) {
  var el = document.body;
  el.style.fontSize = size + 'px';
  return size;
}

/**
 * Parse a document and sanitize it.
 */
function parse(options) {
  options = options || {};

  // If no document is provided, we can't do anything.
  if (!options.document) {
    throw new Error('No document to parse.');
  }

  // Default alt title.
  options.alt = options.alt || 'alt:';

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
        if (attribs.class && attribs.class.match(/hidden-xs/)) {
          return {
            tagName: 'span',
            text: '',
          };
        }
        var src = attribs.src;
        var alt = attribs.alt ? options.alt + ' ' + attribs.alt : '';
        if (src === '/images/nav_logo242_hr.png') {
          return {
            tagName: 'span',
            text: '',
          };
        }
        return {
          tagName: 'p',
          text: '<img src="' + src + '" alt="' + attribs.alt + '" />' +
            alt,
        };
      },
    },
  });

  options.document.documentElement.innerHTML = '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<title>' + options.document.getElementsByTagName('title')[0].innerHTML +
    '</title>' +
    '</head>' +
    '<body id="ext-provisu">' +
    '<div id="ext-provisu-inner"><div>' +
    clean + '</div></div>' +
    '</body>' +
    '</html>';
}
