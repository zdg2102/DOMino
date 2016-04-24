# DOMino.js

JavaScript library for handling DOM interactions and AJAX calls, inspired by JQuery.

See a live sample project built using DOMino [here](http://zdgarcia.com/DOMino).

## Overview

DOMino adds one variable, '$d', to the global namespace.

$d can be called as a function with an argument of an HTML element, a DOM selector string, or a function.
* If called with an HTML element, it will return a DOM Node Collection wrapping that element.
* If called with a selector string, it will return a DOM Node Collection of all elements on the page matching that selector.
* If called with a function, it will set an event listener to execute the function upon page load completion.

## DOM Node Collection
