const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class Icons {
  constructor() {
    this.socialIcons = [
      { name: 'twitter', colour: '#00ACED'},
      { name: 'linkedin', colour: '#007BB6'},
      { name: 'mail', colour: '#D64254'}
    ];

    this.init();
  }
  initSocialIconAnimation() {
    // NOTE TO SELF: When optimising SVG, DO NOT convert path data; this will make Snap.svg animation go bonkers
    // (when animating to original state, the path becomes contorted)

    $.each(this.socialIcons, function(i, socialIcon) {
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
  }
  doMenuAnimation(toggled) {
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
  }
  init() {
    grunticon(["/img/icons/icons.data.svg.css", "/img/icons/icons.data.png.css", "/img/icons/icons.fallback.css"], () => {
      grunticon.svgLoadedCallback(this.initSocialIconAnimation.bind(this));
    });
  }
}

export default new Icons();