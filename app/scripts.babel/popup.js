'use strict';

function click(name) {
  var code;
  chrome.storage.local.get('altered', function(altered) {
    switch (name) {
      case 'default': {
        chrome.tabs.executeScript(null, {
          code: 'unalter(document);',
        });
        break;
      }
      case 'normal': {
        chrome.tabs.executeScript(null, {
          code: 'alter(document);toNormal();',
        });
        break;
      }
      case 'black': {
        chrome.tabs.executeScript(null, {
          code: 'alter(document);toBlack();',
        });
        break;
      }
      case 'blue': {
        chrome.tabs.executeScript(null, {
          code: 'alter(document);toBlue();',
        });
        break;
      }
      case 'cyan': {
        chrome.tabs.executeScript(null, {
          code: 'alter(document);toCyan();',
        });
        break;
      }
      case 'small': {
        chrome.tabs.executeScript(null, {
          code: 'alter(document);toSmallest();',
        });
        break;
      }
      case 'big': {
        chrome.tabs.executeScript(null, {
          code: 'alter(document);toBigger();',
        });
        break;
      }
    }
    window.close();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('default').addEventListener('click', function() {
    click('default');
  });
  document.getElementById('normal').addEventListener('click', function() {
    click('normal');
  });
  document.getElementById('black').addEventListener('click', function() {
    click('black');
  });
  document.getElementById('blue').addEventListener('click', function() {
    click('blue');
  });
  document.getElementById('cyan').addEventListener('click', function() {
    click('cyan');
  });
  document.getElementById('small').addEventListener('click', function() {
    click('small');
  });
  document.getElementById('big').addEventListener('click', function() {
    click('big');
  });
});
