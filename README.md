# DOMino.js

A lightweight JavaScript library for handling DOM interactions and AJAX calls, inspired by JQuery.

See a live sample project built using DOMino [here](http://zdgarcia.com/DOMino).

## Overview

DOMino adds one variable, `$d`, to the global namespace.

`$d` can be called as a function with an argument of an HTML element, a DOM selector string, or a function.
* If called with an HTML element, it will return a DOMNodeCollection wrapping that element.
* If called with a selector string, it will return a DOMNodeCollection of all elements on the page matching that selector.
* If called with a function, it will set an event listener to execute the function upon page load completion.

`$d` also has two property functions, `extend` and `ajax`. `extend` is a utility function that takes any number of objects and adds all their properties to the first object given (with later objects taking precedence). `ajax` is used for AJAX calls and is outlined in more detail below.

## DOMNodeCollection

A DOMNodeCollection acts as a wrapper for DOM elements. It is designed to allow the user to treat it as a single object whether it contains a single DOM element or a collection of elements.

A DOMNodeCollection instance has the following properties:
* `html(htmlArg)`: if called with no arguments, returns the HTML content of the first element of the collection. If passed an argument, sets the HTML content of all elements to equal that argument
* `empty`: removes all child elements (and any text contained within) from all elements of the collection
* `append(content)`: adds the argument given (can be passed as an HTML element, a DOM selector string, or another DOMNodeCollection) to the end of each element of the collection
* `attr(attrName, value)`: if called with only an attribute name, returns the value of that attribute for the first element of the collection. If called with an attribute name and a value, sets that attribute to equal that value for all elements of the collection
* `addClass(className)`: adds the class to all elements of the collection
* `removeClass(className)`: removes the class from all elements of the collection. If called with no argument, removes all classes from all elements of the collection
* `children(selector)`: returns a DOMNodeCollection containing all the child elements of each element of the collection. If called with a selector, returns only children matching that selector.
* `parent(selector)`: returns a DOMNodeCollection containing each parent element of each element of the collection. If called with a selector, returns only parents matching that selector.
* `find(selector)`: returns a DOMNodeCollection of all elements of the collection matching the passed DOM selector string
* `remove(selector)`: removes all elements matching the passed DOM selector string. If called with no argument, removes all elements of the collection
* `on(eventName, callback)`: adds an event listener on the given event executing the given callback to all elements of the collection
* `off(eventName, callback)`: removes the corresponding event listener from all elements of the collection

## AJAX Calls

`$d.ajax` takes an object as an argument containing the parameters of the AJAX call. The parameters include the following options:
* `type`: the HTTP verb of the request, defaults to `GET`
* `url`: the URL to which the request should be made
* `data`: the data to be sent with the request
* `contentType`: sets content type header of the request, defaults to `application/x-www-form-urlencoded; charset=UTF-8`
* `success`: a function to be called if the request completes successfully
* `error`: a function to be called if the request fails to complete successfully
* `completion`: a function to be called upon request completion whether request succeeds or fails
