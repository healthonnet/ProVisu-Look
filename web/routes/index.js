'use strict';

var express = require('express');
var request = require('request');
var sanitizeHtml = require('sanitize-html');
var url = require('url');
var router = express.Router();
var prefix = process.env.PREFIX || '';

/**
 * GET /
 * params: url
 * will return a disable-free website if url param is given,
 * a form otherwise.
 */
router.get('/', function(req, res, next) {
  var locale = require('locale');
  var i18n = require('../_locales/' + req.locale + '/messages.json');

  var lunetteStylePath = prefix + '/css/lunette.css';
  var fontAwesomePath = prefix +
    '/bower_components/components-font-awesome/css/font-awesome.min.css';
  var sanitizeHtmlPath = prefix + '/js/sanitize-html.min.js';
  var lunettePath = prefix + '/js/lunette.js';
  var jqueryPath = prefix + '/bower_components/jquery/dist/jquery.min.js';
  var bootstrapPath = prefix +
    '/bower_components/bootstrap/dist/css/bootstrap.min.css';
  var bootstrapJsPath = prefix +
    '/bower_components/bootstrap/dist/js/bootstrap.min.js';

  if (req.query.url) {
    var base = url.parse(req.query.url, false, true);
    var filter = req.query.filter;
    base.path = decodeURIComponent(base.path);
    var cleanUrl =
      base.protocol + '//' + base.host + encodeURI(base.path);
    request(cleanUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        /**
         * Clean unuseful html tags from html document.
         * https://www.npmjs.com/package/sanitize-html
         */
        var clean = sanitizeHtml(body, {
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
            a: function(tagName, attribs) {
              var href = {};
              if (attribs.href) {
                href = url.parse(attribs.href, false, true);
              }
              var mProtocol = href.protocol || base.protocol;
              var mHost = href.host || base.host;
              return {
                tagName: 'a',
                attribs: {
                  href: '?url=' + mProtocol + '//' + mHost + href.path,
                },
              };
            },
            img: function(tagName, attribs) {
              if (attribs.class && attribs.class.match(/hidden-xs/)) {
                return {
                  tagName: 'span',
                  text: '',
                };
              }
              var src = {};
              if (attribs.src) {
                src = url.parse(attribs.src, false, true);
              }
              if (attribs.src === '/images/nav_logo242_hr.png') {
                return {
                  tagName: 'span',
                  text: '',
                };
              }
              var mProtocol = src.protocol || base.protocol;
              var mHost = src.host || base.host;
              return {
                tagName: 'p',
                text: '<img src="' + mProtocol + '//' + mHost + src.path +
                  '" alt="' + attribs.alt + '" />' + i18n.imageAlt.message +
                  ' ' + attribs.alt,
              };
            },
          },
        });

        /**
         * Rendering
         */
        res.render('index', {
          content: clean,
          baseUrl: base.protocol + '//' + base.host,
          sanitizeHtml: sanitizeHtmlPath,
          lunetteStyle: lunetteStylePath,
          fontAwesome: fontAwesomePath,
          lunette: lunettePath,
          jquery: jqueryPath,
          bootstrap: bootstrapPath,
          bootstrapJs: bootstrapJsPath,
          external: req.query.url,
          filter: filter,
          i18n: i18n,
        });
      } else if (error) {

        /**
         * An error has occured.
         */
        res.render('error', {
          error: error,
          i18n: i18n,
          sanitizeHtml: sanitizeHtmlPath,
          lunette: lunettePath,
          jquery: jqueryPath,
          bootstrap: bootstrapPath,
          bootstrapJs: bootstrapJsPath,
        });
      } else {

        /**
         * Non 200 status code
         */
        res.render('error', {
          error: {
            status: response.statusCode,
          },
          message: response.statusMessage,
          i18n: i18n,
          sanitizeHtml: sanitizeHtmlPath,
          lunetteStyle: lunetteStylePath,
          fontAwesome: fontAwesomePath,
          lunette: lunettePath,
          jquery: jqueryPath,
          bootstrap: bootstrapPath,
          bootstrapJs: bootstrapJsPath,
        });
      }
    });
  } else {

    /**
     * Render basic form for website query
     */
    res.render('query', {
      i18n: i18n,
      sanitizeHtml: sanitizeHtmlPath,
      lunetteStyle: lunetteStylePath,
      fontAwesome: fontAwesomePath,
      lunette: lunettePath,
      jquery: jqueryPath,
      bootstrap: bootstrapPath,
      bootstrapJs: bootstrapJsPath,
    });
  }
});

module.exports = router;
