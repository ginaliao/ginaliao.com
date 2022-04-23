const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class Wipe {
  constructor() {
    this.x = 500;
    this.y = 400;
    this.n = 5;
    this.mStart = 's1, 0, 0, 0';
    this.mMiddle = 's1, 1, 1 , 0';
    this.mEnd = 's1, 0, ' + this.y + ', ' + this.y;

    this.origin = {
      mouseenter: {
        from: this.mStart,
        to: this.mMiddle
      },
      mouseleave: {
        from: this.mMiddle,
        to: this.mEnd
      }
    };

    this.init();
  }
  createSvg(index, elem) {
    var s = Snap(elem);
    
    s.attr({ viewBox: "0 0 " + this.x + " " + this.y });

    for ( var i = 0; i < this.n; i++ ) {
      s.rect(i * (this.x / this.n), 0, this.x / this.n, this.y).attr({ transform: this.mStart }).attr({ fill: '#121820' });
    }
  }
  doAnimation(e) {
    var $link = $(e.currentTarget);
    var $content = $link.find('.js-media-body');
    var svg = $link.find('svg')[0];
    
    var s = Snap(svg);
    var rects = s.selectAll('rect');

    $content.removeClass('is-visible');
    
    rects.forEach(rect => {
      rect.attr({ transform: this.origin[e.type].from});
      rect.animate({ transform: this.origin[e.type].to }, Math.random() * 200 + 200, mina.easeinout);
    });
  }
  bindEvents() {
    $('.js-site-content').on('mouseenter mouseleave', '.js-media-link', e => this.doAnimation.call(this, e));
  }
  init() {
    $('.goo').each((i, el) => this.createSvg.call(this, i, el));
    this.bindEvents();
  }
}

export default new Wipe();