'use strict';

/**
 * Set popup's title
 */
document.getElementsByTagName('h1')[0].innerHTML =
  chrome.i18n.getMessage('appName');

/**
 * Listen to clicks inside popup
 */
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('default').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'unalter(document);',
    });
  });
  document.getElementById('default').addEventListener('mouseover', function() {
    document.getElementById('rollover').innerHTML =
      chrome.i18n.getMessage('infoDefault');
  });
  document.getElementById('default').addEventListener('mouseout', function() {
    document.getElementById('rollover').innerHTML = '';
  });

  document.getElementById('normal').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'normal\', { alt: \'' +
        chrome.i18n.getMessage('imageAlt') + '\' });',
    });
  });
  document.getElementById('normal').addEventListener('mouseover', function() {
    document.getElementById('rollover').innerHTML =
      chrome.i18n.getMessage('infoNormal');
  });
  document.getElementById('normal').addEventListener('mouseout', function() {
    document.getElementById('rollover').innerHTML = '';
  });

  document.getElementById('black').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'black\', { alt: \'' +
        chrome.i18n.getMessage('imageAlt') + '\' });',
    });
  });
  document.getElementById('black').addEventListener('mouseover', function() {
    document.getElementById('rollover').innerHTML =
      chrome.i18n.getMessage('infoBlack');
  });
  document.getElementById('black').addEventListener('mouseout', function() {
    document.getElementById('rollover').innerHTML = '';
  });

  document.getElementById('blue').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'blue\', { alt: \'' +
        chrome.i18n.getMessage('imageAlt') + '\' });',
    });
  });
  document.getElementById('blue').addEventListener('mouseover', function() {
    document.getElementById('rollover').innerHTML =
      chrome.i18n.getMessage('infoBlue');
  });
  document.getElementById('blue').addEventListener('mouseout', function() {
    document.getElementById('rollover').innerHTML = '';
  });

  document.getElementById('cyan').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'cyan\', { alt: \'' +
        chrome.i18n.getMessage('imageAlt') + '\' });',
    });
  });
  document.getElementById('cyan').addEventListener('mouseover', function() {
    document.getElementById('rollover').innerHTML =
      chrome.i18n.getMessage('infoCyan');
  });
  document.getElementById('cyan').addEventListener('mouseout', function() {
    document.getElementById('rollover').innerHTML = '';
  });

  document.getElementById('smaller').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'smaller\', { alt: \'' +
        chrome.i18n.getMessage('imageAlt') + '\' });',
    });
  });
  document.getElementById('smaller').addEventListener('mouseover', function() {
    document.getElementById('rollover').innerHTML =
      chrome.i18n.getMessage('infoSmaller');
  });
  document.getElementById('smaller').addEventListener('mouseout', function() {
    document.getElementById('rollover').innerHTML = '';
  });

  document.getElementById('bigger').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'bigger\', { alt: \'' +
        chrome.i18n.getMessage('imageAlt') + '\' });',
    });
  });
  document.getElementById('bigger').addEventListener('mouseover', function() {
    document.getElementById('rollover').innerHTML =
      chrome.i18n.getMessage('infoBigger');
  });
  document.getElementById('bigger').addEventListener('mouseout', function() {
    document.getElementById('rollover').innerHTML = '';
  });

  // TODO: fix image hiding.
  // document.getElementById('toggleImages')
  //   .addEventListener('click', function() {
  //   chrome.tabs.executeScript(null, {
  //     code: 'alter(document, \'toggle\');',
  //   });
  // });
});

/**
 * Close window on mouseOut
 */
setTimeout(function() {
  document.addEventListener('mouseout', function(e) {
    e = e ? e : window.event;
    var from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName === 'HTML') {
      window.close();
    }
  });
}, 800);
