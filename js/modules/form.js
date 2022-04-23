class Form {
  constructor() {
    this.$modalWrapper = $('.js-modal-overlay');
    this.$modal = $('.js-modal');
    this.isFormLoaded = false;
    this.$form = $('.js-contact');
    this.$button = this.$form.find('.js-submit');
    this.$buttonLabel = this.$button.find('.js-submit-text');

    this.init();
  }
  loadForm() {
    $('.js-modal-content').load('/contact/index.html #js-form', () => this.init());
    this.isFormLoaded = true;
  }
  validateField() {
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
  isValid() {
    var _this = this;
    var fields = form.find('[required]');

    var invalid = $.grep(fields, function(field) {
      return !_this.validateField($(field));
    });

    if ( invalid.length ) {
      $('body').on('blur', '.is-invalid', function() {
        _this.validateField($(this).find('[required]'));
      });
    }

    return !invalid.length;
  }
  open(e) {
    e.preventDefault();

    if ( !this.isFormLoaded ) this.loadForm();

    $('body').addClass('modal-is-visible');
    this.$modalWrapper.addClass('is-visible').attr('aria-hidden', false);
    this.$modal.removeClass('is-bouncing-out').addClass('is-bouncing-in').attr('tabindex', '0');
  }
  close(e) {
    e.preventDefault();
    var _this = this;

    _this.$modal.removeClass('is-bouncing-in').addClass('is-bouncing-out').attr('tabindex', '-1');

    setTimeout(function() {
      $('body').removeClass('modal-is-visible');
      _this.$modalWrapper.removeClass('is-visible').attr('aria-hidden', true);
    }, 750);
  }
  doSuccessMessage() {
    this.$button
      .removeClass('is-loading')
      .addClass('is-success');

    this.$buttonLabel.text('Sent!');
  }
  doErrorMessage() {
    this.$button
      .removeClass('is-loading')
      .addClass('is-error')
      .removeAttr('disabled');

    this.$buttonLabel.text('Try again?');
  }
  submit(e) {
    e.preventDefault();
    var _this = this;

    if ( _this.isValid(_this.$form) ) {
      _this.$button
        .removeClass('is-error')
        .addClass('is-loading')
        .attr('disabled', true);
            
      _this.$buttonLabel.text('Sending');

      var xhr = $.ajax({
        url: _this.$form.attr('action'),
        method: 'POST',
        data: _this.$form.serialize(),
        dataType: 'json'
      });

      xhr.done(_this.doSuccessMessage);
      xhr.fail(_this.doErrorMessage);
    }
  }
  bindEvents() {
    $('.js-modal-open').on('click', e => this.open(e));
    $('.js-modal-close').on('click', e => this.close(e));
    $('.js-modal').on('submit', '.js-contact', e => this.submit(e));
  }
  init() {
    this.$form.attr('novalidate', 'novalidate');
    this.bindEvents();
  }
}

export default new Form();