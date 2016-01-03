(function() {

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

}());