
import wipe from './wipe';

// https://rosspenman.com/pushstate-jquery/
class Transition {
  constructor() {
    this.transitions = ['up', 'right', 'left'];
    this.outerContainerClass = '.js-site-content';
    this.innerContainerClass = '.js-container';
    this.$container = $(this.outerContainerClass);

    this.init();
  }
  isInternal(url) {
    if ( url === '/' ) {
      return true;
    }

    var tempLink = document.createElement('a');
    tempLink.href = url;
    return tempLink.hostname === window.location.hostname;
  }
  loadPage(e) {
    var a = e.currentTarget;
    var url = $(a).attr('href');

    if ( this.isInternal(url) && !$(a).hasClass('js-modal-open') ) {
      e.preventDefault();
      this.doTransition(url);
      history.pushState({}, '', url);
    }
  }
  loadPageOnBack(e) {
    if (e.originalEvent.state !== null) {
      this.doTransition(location.href);
    }
  }
  doTransition(url) {
    var transition = this.transitions[Math.floor(Math.random() * 3)];

    $('html, body').animate({
      scrollTop: 0
    }, 250);

    this.$container.find(this.innerContainerClass).addClass('is-fading-out is-fading-out--' + transition);

    setTimeout(() => {
      this.$container.load(url + ' ' + this.innerContainerClass, content => {
        document.title = $(content).filter('title').text();
        this.$container.find(this.innerContainerClass).addClass('is-fading-in is-fading-in--' + transition);
        wipe.init();

        if ( /ginaliao\.com/.test(window.location.hostname) ) {
          ga('send', 'pageview');
        }
      });
    }, 500);
  }
  bindEvents() {
    $('.js-site-header, .js-site-content, .js-site-footer').on('click', 'a', e => this.loadPage(e));
    $(window).on('popstate', e => this.loadPageOnBack(e));
  }
  init() {
    this.bindEvents();
  }
}

export default new Transition();