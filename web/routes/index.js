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
  if (req.query.url) {
    var base = url.parse(req.query.url);
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
          ],
          allowedAttributes: {
            a: [ 'href' ],
            img: [ 'src' ],
          },

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
              var src = {};
              if (attribs.src) {
                src = url.parse(attribs.src);
              }
              var mProtocol = src.protocol || base.protocol;
              var mHost = src.host || base.host;
              return {
                tagName: 'img',
                attribs: {
                  src: mProtocol + '//' + mHost + src.path,
                },
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
          localUrl: 'http://' + req.headers.host,
          external: req.query.url,
        });
      } else if (error) {

        /**
         * An error has occured.
         */
        res.render('error', {
          error: error,
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
        });
      }
    });
  } else {

    /**
     * Render basic form for website query
     */
    res.render('query');
  }
});

module.exports = router;
