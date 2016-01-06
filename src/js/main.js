(function($) {

  "use strict";

  var icons = (function() {

    var initSocialIconAnimation = function() {
      // NOTE TO SELF: When optimising SVG, DO NOT convert path data; this will make Snap.svg animation go bonkers
      // (when animating to original state, the path becomes contorted)

      var socialIcons = [
        { name: 'twitter', colour: '#00ACED'},
        { name: 'linkedin', colour: '#007BB6'},
        { name: 'mail', colour: '#D64254'}
      ];

      $.each(socialIcons, function(i, socialIcon) {
        $('.icon-' + socialIcon.name).each(function() {
          var s = Snap(this);
          s.hover(function() {
            s.select('.bg-' + socialIcon.name).stop()
              .animate({ d: 'M36.2 7.8C28.3 0 20.5-4.9 7.8 7.8S0 28.3 7.8 36.2c7.9 7.9 15.7 12.7 28.4 0s7.8-20.5 0-28.4z' }, 1000, mina.bounce)
              .animate( { fill: socialIcon.colour }, 500, mina.linear);
          }, function() {
            s.select('.bg-' + socialIcon.name).stop()
            .animate({ d: 'M22,0C9.8,0,0,2.3,0,22c0,19.7,9.8,22,22,22 s22-2.3,22-22C44,2.3,34.2,0,22,0z', fill: '#3F4D5F' }, 500, mina.easein);
          });
        });
      });
    };

    var doMenuAnimation = function(toggled) {
      // Adapted from http://tympanus.net/codrops/2013/11/05/animated-svg-icons-with-snap-svg/

      var lines = [{ 
        el: '#nav-line-1', 
        animProperties: { 
          from: { val: '{"path" : "m 5.0916789,20.818994 53.8166421,0"}', duration: 600, ease: mina.elastic }, 
          to: { val: '{"path" : "M 12.972944,50.936147 51.027056,12.882035"}', duration: 600, ease: mina.elastic }
        } 
      }, { 
        el: '#nav-line-2', 
        animProperties: { 
          from: { val: '{"transform" : "s1 1", "opacity" : 1}', before: '{"transform" : "s0 0"}', duration: 600, ease: mina.elastic }, 
          to: { val: '{"opacity" : 0}', duration: 0, ease: mina.easeout }
        } 
      }, { 
        el: '#nav-line-3', 
        animProperties: { 
          from: { val: '{"path" : "m 5.0916788,42.95698 53.8166422,0"}', duration: 600, ease: mina.elastic }, 
          to: { val: '{"path" : "M 12.972944,12.882035 51.027056,50.936147"}', duration: 600, ease: mina.elastic }
        } 
      }];

      var s = Snap('#nav-lines');
      var g = s.select('g');
      g = toggled ? g.animate({ stroke: '#F2F2F2' }, 300, mina.easeinout ) : g.animate({ stroke: '#243040' }, 300, mina.easeinout );

      lines.forEach(function(line) {
        var l = s.select(line.el);
        var state = !toggled ? line.animProperties.from : line.animProperties.to;

        if ( state.before ) {
          l.attr( JSON.parse(state.before) );
        }

        l.stop().animate( JSON.parse(state.val), state.duration, state.ease );
      });
    };

    var init = function() {
      initSocialIconAnimation();
    };

    return {
      doMenuAnimation: doMenuAnimation,
      init: init
    };
  }());

  var form = (function() {

    var $modalWrapper = $('.js-modal-overlay');
    var $modal = $('.js-modal');
    var invalidClass = 'is-invalid';
    var isFormLoaded = false;

    var loadForm = function() {
      $('.js-modal-content').load('/contact/index.html #js-form', init);
      isFormLoaded = true;
    };

    var init = function() {
      $('.js-contact').attr('novalidate', 'novalidate');
    };

    var validate = function(form) {
      var fields = form.find('[required]');

      function validateField($field) {
        var tests = {
          required: function(val) {
            return !!val.length;
          },
          email: function(val) {
            return this.required(val) && /^(?:\w+\.?\+?)*\w+@(?:\w+\.)+\w+$/.test(val);
          }
        };

        var fieldValue = $field.val();
        var valid = $field.attr('type') === 'email' ? tests.email(fieldValue) : tests.required(fieldValue);

        $field.parents('.field').toggleClass('is-invalid', !valid);

        return valid;
      }

      var invalid = $.grep(fields, function(field) {
        return !validateField($(field));
      });

      if ( invalid.length ) {
        $('body').on('blur', '.is-invalid', function() {
          validateField($(this).find('[required]'));
        });
      }

      return !invalid.length;
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

    var submit = function(e) {
      e.preventDefault();

      var $form = $(this);
      var $button = $form.find('.js-submit');
      var $buttonLabel = $button.find('.js-submit-text');

      function doSuccessMessage() {
        $button
          .removeClass('is-loading')
          .addClass('is-success');

        $buttonLabel.text('Sent!');
      }

      function doErrorMessage() {
        $button
          .removeClass('is-loading')
          .addClass('is-error')
          .removeAttr('disabled');

        $buttonLabel.text('Try again?');
      }

      if ( validate($form) ) {
        $button
          .removeClass('is-error')
          .addClass('is-loading')
          .attr('disabled', true);
              
        $buttonLabel.text('Sending');

        var xhr = $.ajax({
          url: $form.attr('action'),
          method: 'POST',
          data: $form.serialize(),
          dataType: 'json'
        });

        xhr.done(doSuccessMessage);
        xhr.fail(doErrorMessage);

        // setTimeout(doSuccessMessage, 1500);
        // setTimeout(doErrorMessage, 1500);
      }
    };

    return {
      init: init,
      open: open,
      close: close,
      submit: submit
    };

  }());

  var menu = (function() {

    var $menuToggle = $('.js-toggle-menu');
    var $menu = $('.js-site-nav-list');
    var isToggled = false;

    var toggleAria = function() {
      $menuToggle.attr('aria-expanded', isToggled);
      $menu.attr('aria-hidden', !isToggled);
    };

    var init = function() {
      $menuToggle
        .attr('aria-label', 'Toggle menu')
        .attr('aria-controls', 'menu')
        .attr('aria-expanded', false);

      $menu
        .attr('aria-labelledby', $menuToggle.attr('id'))
        .attr('aria-hidden', true);
    };

    var toggle = function(e) {
      e.preventDefault();
      
      isToggled = !isToggled;

      toggleAria();
      $menuToggle.toggleClass('is-toggled');
      $('.js-site-header, .js-site-nav-list').toggleClass('is-toggled');

      icons.doMenuAnimation($menuToggle.hasClass('is-toggled'));
    };

    return {
      init: init,
      toggle: toggle
    };

  }());

  var init = (function() {

    var bindEvents = function() {
      $('.js-modal-open').on('click', form.open);
      $('.js-modal-close').on('click', form.close);
      $('.js-modal').on('submit', '.js-contact', form.submit);
      $('.js-toggle-menu').on('click', menu.toggle);
    };

    var start = function() {
      $('.no-js').removeClass('no-js').addClass('js');

      grunticon(["/img/icons/icons.data.svg.css", "/img/icons/icons.data.png.css", "/img/icons/icons.fallback.css"], function() {
        grunticon.svgLoadedCallback(icons.init);
      });

      menu.init();
      bindEvents();
    };

    return {
      start: start
    };

  }());

  init.start();
}(jQuery));