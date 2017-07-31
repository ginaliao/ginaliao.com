import icons from './icons';

class Menu {
  constructor() {
    this.$menuToggle = $('.js-toggle-menu');
    this.$menu = $('.js-site-nav-list');
    this.isToggled = false;

    this.init();
  }
  toggleAria() {
    this.$menuToggle.attr('aria-expanded', this.isToggled);
    this.$menu.attr('aria-hidden', !this.isToggled);
  }
  toggle(e) {
    if ( $(e.target).hasClass('js-toggle-menu') ) {
      e.preventDefault();
    }
    
    this.isToggled = !this.isToggled;

    this.toggleAria();
    this.$menuToggle.toggleClass('is-toggled');
    $('.js-site-header, .js-site-nav-list').toggleClass('is-toggled');

    icons.doMenuAnimation(this.isToggled);
  }
  close(e) {
    if ( this.$menu.hasClass('is-toggled') ) {
      this.toggle(e);
    }
  }
  bindEvents() {
    this.$menuToggle.on('click', e => this.toggle(e));
    this.$menu.on('click', 'a', e => this.close(e));
  }
  init() {
    this.$menuToggle
      .attr('aria-label', 'Toggle menu')
      .attr('aria-controls', 'site-nav-list')
      .attr('aria-expanded', false);

    this.$menu
      .attr('aria-labelledby', this.$menuToggle.attr('id'));

    this.bindEvents();
  }
}

export default new Menu();