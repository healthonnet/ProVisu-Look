'use strict';

function loadProvisuToolbar(element, url, file) {
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
    });
  }

  function complete(evt) {
    var json = JSON.parse(evt.srcElement.responseText);
    generateHTML(element, url, json);
  }
}

function generateHTML(element, url, i18n) {
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
  document.getElementById(element).innerHTML = html;
}
