'use strict';

function loadProvisuToolbar(element, url, i18n) {
  var html = '<ul id="sidebox">' +
    '<li>' +
    '<a href="/service?url=' + url + '"><div class="item-normal low-vision">' +
    '</div>' +
    '<span class="tooltip tool-normal">' + i18n.infoNormal.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-sm hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=black">' +
    '<div class="item-black low-vision">' +
    '</div>' +
    '<span class="tooltip tool-black">' + i18n.infoBlack.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-sm hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=blue">' +
    '<div class="item-blue low-vision">' +
    '</div>' +
    '<span class="tooltip tool-blue">' + i18n.infoBlue.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-sm hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=cyan">' +
    '<div class="item-cyan low-vision">' +
    '</div>' +
    '<span class="tooltip tool-cyan">' + i18n.infoCyan.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-sm hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=smaller">' +
    '<div class="item-smaller">A-' +
    '</div>' +
    '<span class="tooltip tool-normal">' + i18n.infoSmaller.message +
    '</span></a>' +
    '</li>' +

    '<li class="hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=bigger">' +
    '<div class="item-bigger">A+' +
    '</div>' +
    '<span class="tooltip tool-normal">' + i18n.infoBigger.message +
    '</span></a>' +
    '</li>' +

    '</ul>';
  document.getElementById(element).innerHTML = html;
}
