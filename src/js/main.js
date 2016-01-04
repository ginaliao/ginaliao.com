(function($) {

  "use strict";

  // Attaching to window object so the Grunticon callback will have access
  window.icons = {};

  icons.init = function() {

    // NOTE TO SELF: When optimising SVG, DO NOT convert path data; this will make Snap.svg animation go bonkers
    // (when animating to original state, the path becomes contorted)

    var icons = [
      { name: 'twitter', colour: '#00ACED'},
      { name: 'linkedin', colour: '#007BB6'},
      { name: 'mail', colour: '#D64254'}
    ];

    icons.forEach(function(icon, i) {
      var s = Snap('#icon-' + icon.name);
      s.hover(function() {
        s.select('#bg-' + icon.name).stop()
          .animate({ d: 'M36.2 7.8C28.3 0 20.5-4.9 7.8 7.8S0 28.3 7.8 36.2c7.9 7.9 15.7 12.7 28.4 0s7.8-20.5 0-28.4z' }, 1000, mina.bounce)
          .animate( { fill: icon.colour }, 500, mina.linear);
      }, function() {
        s.select('#bg-' + icon.name).stop()
        .animate({ d: 'M22,0C9.8,0,0,2.3,0,22c0,19.7,9.8,22,22,22 s22-2.3,22-22C44,2.3,34.2,0,22,0z', fill: '#3F4D5F' }, 500, mina.easein);
      });
    });
    
  };

  var form = (function() {

    var $modalWrapper = $('.js-modal-overlay');
    var $modal = $('.js-modal');
    var isFormLoaded = false;

    var loadForm = function() {
      $('.js-modal-content').load('/contact/index.html #js-form');
      isFormLoaded = true;
    };

    var open = function(e) {
      e.preventDefault();

      if ( !isFormLoaded ) loadForm();

      $('body').addClass('modal-is-visible');
      $modalWrapper.addClass('is-visible');
      $modal.addClass('is-visible');
    };

    var close = function(e) {
      e.preventDefault();

      $modal.removeClass('is-visible');

      setTimeout(function() {
        $('body').removeClass('modal-is-visible');
        $modalWrapper.removeClass('is-visible');
      }, 300);
    };

    var submit = function() {

    };

    return {
      open: open,
      close: close,
      submit: submit
    };

  }());

  var init = (function() {

    var bindEvents = function() {
      $('.js-modal-open').on('click', form.open);
      $('.js-modal-close').on('click', form.close);
      $('.js-form-submit').on('submit', form.submit);
    };

    var start = function() {
      bindEvents();
    };

    return {
      start: start
    };

  }());

  init.start();
}(Zepto));