'use strict';

var express = require('express');
var request = require('request');
var sanitizeHtml = require('sanitize-html');
var url = require('url');
var router = express.Router();

/**
 * GET /
 * params: url
 * will return a disable-free website if url param is given,
 * a form otherwise.
 */
router.get('/', function(req, res, next) {
  var locale = require('locale');
  console.log('user i18n: ' + req.locale);
  var i18n = require('../_locales/' + req.locale + '/messages.json');

  var sanitizeHtmlPath = 'http://' + req.headers.host +
    '/js/sanitize-html.min.js';
  var lunettePath = 'http://' + req.headers.host +
    '/js/lunette.js';

  if (req.query.url) {
    var base = url.parse(req.query.url);
    var filter = req.query.filter;
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
                href = url.parse(attribs.href);
              }
              var mProtocol = href.protocol || base.protocol;
              var mHost = href.host || base.host;
              return {
                tagName: 'a',
                attribs: {
                  href: 'http://' + req.headers.host + '/?url=' +
                    mProtocol + '//' + mHost + href.path,
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
                src = url.parse(attribs.src);
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
          lunette: lunettePath,
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
          lunette: lunettePath,
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
      lunette: lunettePath,
    });
  }
});

module.exports = router;
