(function($) {
  // Your handcrafted scripts go here!

  var module = (function() {
    var privateVar = true;

    var doSomething = function() {

    };

    var doSomethingElse = function() {

    };

    return {
      doSomething: doSomething,
      doSomethingElse: doSomethingElse
    };
  }());

  var init = (function() {
    var bindEvents = function() {
      $('#thing').on('click', module.doSomething);
    };

    var start = function() {
      bindEvents();
    };

    return {
      bindEvents: bindEvents,
      start: start
    };
  }());

  init.start();
}(jQuery));