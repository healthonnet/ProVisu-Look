'use strict';

$(function() {
  $(document).on('click', '#provisu-toolbar-smaller', function() {
    setFontSize(-4);
  });
  $(document).on('click', '#provisu-toolbar-bigger', function() {
    setFontSize(4);
  });
});

function loadProvisuToolbar(element, url, file) {
  if (element && typeof (element) !== 'object') {
    // Legacy mode
    element = {
      container: element,
      url: url,
      i18n: file.substring(10,12),
      responsive: true,
      fontSize: true,
    };
  }
  element.url = element.url || '#';
  element.i18n = element.i18n || 'en';
  element.json = {};
  element.json = element.json[element.i18n];
  generateHTML(null, element);
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

function generateHTML(err, element) {
  if (err) {
    document.getElementById(element.container).innerHTML = err;
    return;
  }
  element.responsive = element.responsive || false;
  element.fontSize = element.fontSize || false;
  element.icon = element.icon || false;
  var hidden = element.responsive ? 'hidden-xs' : '';
  element.url = 'https://www.provisu.ch/service?url=' +
    encodeURIComponent(decodeURIComponent(element.url));
  var html = '<style>INSERT_TOOLBAR_CSS</style>';
  html += '<div class="btn-group" role="group" aria-label="...">';
  if (!element.icon || element.icon === 'white') {
    html +=
    '<a href="' + element.url + '&filter=normal" ' +
    'class="btn btn-default provisu-tooltip">' +
    '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
    '<span>' + element.json.toolbarDescription.message + ' - ' +
    element.json.infoNormal.message + '</span>' +
    '</a>';
  }
  if (!element.icon || element.icon === 'black') {
    html += '<a href="' + element.url + '&filter=black" ' +
    'class="btn btn-default tooltip-bk provisu-tooltip ' + hidden + '">' +
    '<span>' + element.json.toolbarDescription.message + ' - ' +
    element.json.infoBlack.message + '</span>' +
    '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
    '</a>';
  }
  if (!element.icon || element.icon === 'blue') {
    html += '<a href="' + element.url + '&filter=blue" ' +
    'class="btn btn-default tooltip-bl provisu-tooltip ' + hidden + '">' +
    '<span>' + element.json.toolbarDescription.message + ' - ' +
    element.json.infoBlue.message + '</span>' +
    '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
    '</a>';
  }
  if (!element.icon || element.icon === 'cyan') {
    html += '<a href="' + element.url + '&filter=cyan" ' +
    'class="btn btn-default tooltip-cy provisu-tooltip ' + hidden + '">' +
    '<span>' + element.json.toolbarDescription.message + ' - ' +
    element.json.infoCyan.message + '</span>' +
    '<i class="fa fa-low-vision fa-2x" aria-hidden="true"></i>' +
    '</a>';
  }
  if (element.fontSize) {
    html += '<button type="button" class="btn btn-default provisu-tooltip" ' +
      'id="provisu-toolbar-smaller"><span>' + element.json.infoSmaller.message +
      '</span>' + '<i class="fa fa-minus fa-2x" aria-hidden="true"></i>' +
      '</button>' +
      '<button type="button" class="btn btn-default provisu-tooltip" ' +
      'id="provisu-toolbar-bigger"><span>' + element.json.infoBigger.message +
      '</span>' + '<i class="fa fa-plus fa-2x" aria-hidden="true"></i>' +
      '</button>';
  }
  html += '</div';
  document.getElementById(element.container).innerHTML = html;
}
