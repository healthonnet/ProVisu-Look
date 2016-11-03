'use strict';

function loadProvisuToolbar(element, url, file, extra) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', file, true);
  xobj.addEventListener('load', complete);
  xobj.addEventListener('error', failed);
  xobj.send(null);

  function failed(evt) {
    generateHTML(element, url, {
      infoNormal: {
        message: 'normal',
      },
      infoBlack: {
        message: 'black',
      },
      infoBlue: {
        message: 'blue',
      },
      infoCyan: {
        message: 'cyan',
      },
      infoSmaller: {
        message: 'smaller',
      },
      infoBigger: {
        message: 'bigger',
      },
      toolbarDescription: {
        message: 'visually impaired persons',
      },
    }, extra);
  }

  function complete(evt) {
    var json = JSON.parse(evt.target.responseText);
    generateHTML(element, url, json, extra);
    $(function() {
      $('#toolbar-smaller').click(function() {
        setFontSize(-4);
      });
      $('#toolbar-bigger').click(function() {
        setFontSize(4);
      });
      // $(document).ready(function() {
      //   $('[data-toggle="tooltip"]').tooltip({
      //     container: 'body',
      //     template: '<div class="tooltip tooltip-big" role="tooltip">' +
      //       '<div class="tooltip-arrow"></div>' +
      //       '<div class="tooltip-inner tooltip-wide"></div></div>',
      //   });
      // });
    });
  }
}

function setFontSize(variant) {
  var tags = ['span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  var elements = [document.body];
  var tmp;
  var currentFontSize;
  var currentLineHeight;
  var newSize;
  var newHeight;
  for (var i = 0; i < tags.length; i++) {
    tmp = Array.prototype.slice.call(
      document.body.getElementsByTagName(tags[i]), 0
    );
    elements = elements.concat(tmp);
  }
  for (i = 0; i < elements.length; i++) {
    currentFontSize = parseFloat(
      window.getComputedStyle(elements[i], null).getPropertyValue('font-size')
    );
    currentLineHeight = parseFloat(
      window.getComputedStyle(elements[i], null).getPropertyValue('line-height')
    );
    newSize = currentFontSize + variant;
    newSize = newSize < 12 ? 12 : newSize;
    newHeight = currentLineHeight + variant;
    newHeight = newHeight < 12 ? 12 : newHeight;
    elements[i].style.fontSize = newSize + 'px';
    elements[i].style.lineHeight = newHeight + 'px';
  }
}

function generateHTML(element, url, i18n) {
  url = encodeURIComponent(decodeURIComponent(url));
  var html = '<div class="btn-group" role="group" aria-label="...">' +
    '<a href="/service?url=' + url + '&filter=normal" ' +
    'class="btn btn-default provisu-tooltip">' +
    '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
    '<span>' + i18n.toolbarDescription.message + ' - ' +
    i18n.infoNormal.message + '</span>' +
    '</a>' +
    '<a href="/service?url=' + url + '&filter=black" ' +
    'class="btn btn-default tooltip-bk provisu-tooltip hidden-xs">' +
    '<span>' + i18n.toolbarDescription.message + ' - ' +
    i18n.infoBlack.message + '</span>' +
    '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
    '</a>' +
    '<a href="/service?url=' + url + '&filter=blue" ' +
    'class="btn btn-default tooltip-bl provisu-tooltip hidden-xs">' +
    '<span>' + i18n.toolbarDescription.message + ' - ' +
    i18n.infoBlue.message + '</span>' +
    '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
    '</a>' +
    '<a href="/service?url=' + url + '&filter=cyan" ' +
    'class="btn btn-default tooltip-cy provisu-tooltip hidden-xs">' +
    '<span>' + i18n.toolbarDescription.message + ' - ' +
    i18n.infoCyan.message + '</span>' +
    '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
    '</a>' +
    '<button type="button" class="btn btn-default provisu-tooltip" ' +
    'id="toolbar-smaller"><span>' + i18n.infoSmaller.message + '</span>' +
    '<i class="fa fa-minus fa-2x" aria-hidden="true"></i>' +
    '</button>' +
    '<button type="button" class="btn btn-default provisu-tooltip" ' +
    'id="toolbar-bigger"><span>' + i18n.infoBigger.message + '</span>' +
    '<i class="fa fa-plus fa-2x" aria-hidden="true"></i>' +
    '</button>' +
    '</div>';
  document.getElementById(element).innerHTML = html;
}
