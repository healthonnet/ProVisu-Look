'use strict';

function loadProvisuToolbar(element, url) {
  var html = '<ul id="sidebox">' +
    '<li>' +
    '<a href="/service?url=' + url + '"><div class="item-normal low-vision">' +
    '</div></a>' +
    '</li>' +
    '<li class="hidden-sm hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=black">' +
    '<div class="item-black low-vision">' +
    '</div></a>' +
    '</li>' +
    '<li class="hidden-sm hidden-xs">' +
    '<a href="/service?url=' + url + '&filter=blue">' +
    '<div class="item-blue low-vision">' +
    '</div></a>' +
    '</li>' +
    '<li class="hidden-sm hidden-xs>' +
    '<a href="/service?url=' + url + '&filter=cyan">' +
    '<div class="item-cyan low-vision">' +
    '</div></a>' +
    '</li>' +
    '<li class="hidden-sm hidden-xs>' +
    '<a href="/service?url=' + url + '&filter=smaller">' +
    '<div class="item-normal">' +
    'A-' +
    '</div></a>' +
    '</li>' +
    '<li class="hidden-xs>' +
    '<a href="/service?url=' + url + '&filter=bigger">' +
    '<div class="item-normal">' +
    'A+' +
    '</div></a>' +
    '</li>' +
    '</ul>';
  document.getElementById(element).innerHTML = html;
}
