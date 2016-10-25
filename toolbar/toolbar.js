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
      $('[data-toggle="tooltip"]').tooltip({
        container: 'body',
        template: '<div class="tooltip tooltip-big" role="tooltip">' +
          '<div class="tooltip-arrow"></div>' +
          '<div class="tooltip-inner tooltip-wide"></div></div>',
      });
      $('#toolbar-smaller').click(function() {
        setFontSize(getFontSize() - 4);
      });
      $('#toolbar-bigger').click(function() {
        setFontSize(getFontSize() + 4);
      });
    });
  }
}

function getFontSize() {
  var el = document.body;
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  return parseFloat(style);
}

function setFontSize(size) {
  var el = document.body;
  el.style.fontSize = size + 'px';
  return size;
}

function generateHTML(element, url, i18n, extra) {
  var html = '<ul id="sidebox">' +
    '<li>' +
    '<a href="/service?url=' + url + '"><div class="item-normal low-vision">' +
    '</div>' +
    '<span class="provisu-tooltip tool-normal">' + i18n.infoNormal.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=black">' +
    '<div class="item-black low-vision">' +
    '</div>' +
    '<span class="provisu-tooltip tool-black">' + i18n.infoBlack.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=blue">' +
    '<div class="item-blue low-vision">' +
    '</div>' +
    '<span class="provisu-tooltip tool-blue">' + i18n.infoBlue.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=cyan">' +
    '<div class="item-cyan low-vision">' +
    '</div>' +
    '<span class="provisu-tooltip tool-cyan">' + i18n.infoCyan.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=smaller">' +
    '<div class="item-smaller">A-' +
    '</div>' +
    '<span class="provisu-tooltip tool-normal">' + i18n.infoSmaller.message +
    '</span></a>' +
    '</li>' +

    '<li>' +
    '<a href="/service?url=' + url + '&filter=bigger">' +
    '<div class="item-bigger">A+' +
    '</div>' +
    '<span class="provisu-tooltip tool-normal">' + i18n.infoBigger.message +
    '</span></a>' +
    '</li>' +

    '</ul>';

  if (extra) {
    html = '<div class="btn-group" role="group" aria-label="...">' +
      '<a href="/service?url=' + url + '" class="btn btn-default" ' +
      'data-toggle="tooltip" data-placement="bottom" ' +
      'title="' + i18n.toolbarDescription.message + '">' +
      '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
      '</a>' +
      // Remove font-size buttons
      // '<button type="button" class="btn btn-default" id="toolbar-smaller" ' +
      // 'data-toggle="tooltip" data-placement="bottom" ' +
      // 'title="' + i18n.infoSmaller.message + '">' +
      // '<i class="fa fa-minus fa-2x" aria-hidden="true"></i>' +
      // '</button>' +
      // '<button type="button" class="btn btn-default" id="toolbar-bigger" ' +
      // 'data-toggle="tooltip" data-placement="bottom" ' +
      // 'title="' + i18n.infoBigger.message + '">' +
      // '<i class="fa fa-plus fa-2x" aria-hidden="true"></i>' +
      // '</button>' +
      '</div>';
  }
  document.getElementById(element).innerHTML = html;
}
