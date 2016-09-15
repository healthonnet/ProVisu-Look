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

  document.getElementById('normal').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'normal\');',
    });
  });

  document.getElementById('black').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'black\');',
    });
  });

  document.getElementById('blue').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'blue\');',
    });
  });

  document.getElementById('cyan').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'cyan\');',
    });
  });

  document.getElementById('smaller').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'smaller\');',
    });
  });

  document.getElementById('bigger').addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
      code: 'alter(document, \'bigger\');',
    });
  });
});
