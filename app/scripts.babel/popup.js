'use strict';

function click(name) {
  var code;
  switch (name) {
    case 'default': {
      code = {
        code: 'document.body.classList.remove(\'\')',
      };
      break;
    }
    case 'normal': {
      code = {
        code: 'document.body.classList.add(\'ext-provisu-normal\');' +
          'document.body.classList.remove(\'ext-provisu-black\');' +
          'document.body.classList.remove(\'ext-provisu-blue\');' +
          'document.body.classList.remove(\'ext-provisu-cyan\');',
      };
      break;
    }
    case 'black': {
      code = {
        code: 'document.body.classList.add(\'ext-provisu-black\');' +
          'document.body.classList.remove(\'ext-provisu-normal\');' +
          'document.body.classList.remove(\'ext-provisu-blue\');' +
          'document.body.classList.remove(\'ext-provisu-cyan\');',
      };
      break;
    }
    case 'blue': {
      code = {
        code: 'document.body.classList.add(\'ext-provisu-blue\');' +
          'document.body.classList.remove(\'ext-provisu-black\');' +
          'document.body.classList.remove(\'ext-provisu-normal\');' +
          'document.body.classList.remove(\'ext-provisu-cyan\');',
      };
      break;
    }
    case 'cyan': {
      code = {
        code: 'document.body.classList.add(\'ext-provisu-cyan\');' +
          'document.body.classList.remove(\'ext-provisu-black\');' +
          'document.body.classList.remove(\'ext-provisu-blue\');' +
          'document.body.classList.remove(\'ext-provisu-normal\');',
      };
      break;
    }
    case 'small': {
      code = {
        code: 'var el = document.getElementById(\'ext-provisu-inner\');' +
          'var style = ' +
          'window.getComputedStyle(el, null).getPropertyValue(\'font-size\');' +
          'var fontSize = parseFloat(style);' +
          'el.style.fontSize = (fontSize - 5) + \'px\';',
      };
      break;
    }
    case 'big': {
      code = {
        code: 'var el = document.getElementById(\'ext-provisu-inner\');' +
          'var style = ' +
          'window.getComputedStyle(el, null).getPropertyValue(\'font-size\');' +
          'var fontSize = parseFloat(style);' +
          'el.style.fontSize = (fontSize + 5) + \'px\';',
      };
      break;
    }
  }
  chrome.tabs.executeScript(null, code);
  window.close();
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
