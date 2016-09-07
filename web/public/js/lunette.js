'use strict';

/**
 * Add click layers
 */
var box = '<div class="line-box">' +
  'Header' +
  '</div>';
if (document.getElementsByTagName('header').length > 0) {
  var header = document.getElementsByTagName('header')[0].innerHTML;
  document.getElementsByTagName('header')[0].innerHTML = box;
  document.getElementsByTagName('header')[0].addEventListener('click',
    function() {
      document.getElementsByTagName('header')[0].innerHTML = header;
    });
}

/**
 * Styles functions
 */
function toNormal() {
  document.getElementById('remove').classList.add('normal');
  document.getElementById('remove').classList.remove('black');
  document.getElementById('remove').classList.remove('blue');
  document.getElementById('remove').classList.remove('cyan');
  document.getElementsByTagName('body')[0].setAttribute(
    'style', 'background-color: rgb(241,240,240); color: black'
  );
}

function toBlack() {
  document.getElementById('remove').classList.add('black');
  document.getElementById('remove').classList.remove('normal');
  document.getElementById('remove').classList.remove('blue');
  document.getElementById('remove').classList.remove('cyan');
  document.getElementsByTagName('body')[0].setAttribute(
    'style', 'background-color: rgb(30,30,30); color: white'
  );
}

function toBlue() {
  document.getElementById('remove').classList.add('blue');
  document.getElementById('remove').classList.remove('normal');
  document.getElementById('remove').classList.remove('black');
  document.getElementById('remove').classList.remove('cyan');
  document.getElementsByTagName('body')[0].setAttribute(
    'style', 'background-color: rgb(0,0,225); color: yellow'
  );
}

function toCyan() {
  document.getElementById('remove').classList.add('cyan');
  document.getElementById('remove').classList.remove('normal');
  document.getElementById('remove').classList.remove('black');
  document.getElementById('remove').classList.remove('blue');
  document.getElementsByTagName('body')[0].setAttribute(
    'style', 'background-color: rgb(180, 209, 203); color: black'
  );
}

function toSmallest() {
  var el = document.getElementById('remove');
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style);
  el.style.fontSize = (fontSize - 5) + 'px';
}

function toBigger() {
  var el = document.getElementById('remove');
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style);
  el.style.fontSize = (fontSize + 5) + 'px';
}
