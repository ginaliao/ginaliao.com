---
layout: post
title: An Evolution in JavaScript File Organisation
category: Workflow
---

In recent weeks, due to the nature of a project I'm currently working on, I've had to rethink how to best organise and build my JS files. Having another look at Webpack (which a year ago I didn't even want to think about because it looked HARD), I'm kicking myself for not using this earlier. As a developer who generally builds light UI/UX interactions as opposed to full-blown apps, I didn't feel like it was necessary to properly organise my JS or give much thought to bundling. But looking back at projects I worked on years, months or even weeks ago that I need to add a feature to, it's sometimes hard to figure out what things do in all the spaghetti. Here's where a little housekeeping pays dividends.

## Way, way back
Back when I was a newbie just starting out, I didn't know much JavaScript and could just barely make use of jQuery plugins. The mantra drilled into me was always "styles at the top, scripts at the bottom", so that's what I did. Often the bottom of my HTML files would just look like:

```html
<script src="js/plugins.min.js"></script>
<script src="js/main.min.js"></script>
```

The `plugins.js` file was a monstrous [manual] concatenation of all the plugins (downloaded manually) used on the site. The `main.js` file was for all my jQuerying and whatnot. You can bet the contents of the `main.js` file was "ordered" chronologically by when I wrote it and wrapped in a `document.ready` function. Gross.

## In more recent times
Fast-forward to a few years back and at this point I've learned to utilise Grunt/Gulp and I'm not manually building my files anymore. I made an attempt to redeem myself by encapsulating functionality with the Revealing Module Pattern. My `main.js` now looked like:

```js
var module = (function() {
  
  function haveAFunction() {
    // do some stuff
  }

  function andAnotherFunction() {
    // do some other stuff
  }

  return {
    haveAFunction: haveAFunction,
    andAnotherFunction: andAnotherFunction
  }

}());

module.haveAFunction();
```

Yeah, I thought I was pretty badass when I finally understood closures. This was nice for a while, but then I always dreaded how long these files got as it was all lumped in the same file as usual. This was basically just organised chaos.

## ...and now
Webpack. It's always been a daunting concept to me (and still is), but I've learned to embrace it. The key thing is to just start and then Google things when your build fails. Now instead of using the Revealing Module Pattern, I can separate out each module into its own file and export its contents:

```js
// module.js

class Module {
  constructor() {
    this.config = {
      someSetting: true,
      anotherSetting: false
    };
    this.$foo = $('.foo');
    this.init();
  }
  bindEvents() {
    this.$foo.on('click', () => this.doSomething());
  }
  doSomething() {
    // do some things
  }
  init() {
    this.bindEvents();
  }
}

export let module = new Module();
```

Here I'm using ES6 which will require Babel to transform the code so it's consumable for older browsers. I think the class-based syntax is quite nice for organising the different parts of a module. What's cool is I can also import things inside each of my modules so I can keep track of dependencies. With a library like Lodash, I can even import individual functions that I want to use without importing the entire library. Now my  `main.js` file isn't littered with code but is just a series of imports and is basically now an entry point. Once configured, Webpack will go through the entry point and bundle all dependencies together.

```js
// main.js

import path from 'path'; // inside /node_modules and installed via npm/yarn
import './module.js'; // my own JS file, note the relative path
```

Here's an example of my `webpack.config.js`:

```js
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'js/main.js')
  },
  output: {
    path: __dirname + '/js',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      '_': 'lodash',
      'Modernizr': 'modernizr'
    })
  ],
  externals: {
    jquery: 'jQuery',
    lodash: 'lodash',
    modernizr: 'Modernizr'
  }
};

if ( process.env.NODE_ENV === 'production' ) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}
```

A breakdown of what this does:

* I can specify multiple entry points and Webpack will output my files with a naming convention based on the key
* I use Babel to transpile my code
* Allow the use of external JS files that are not bundled with Webpack
* If I've set a Node environment variable equal to 'production', the JS files will then be minified

I was able to put together this Webpack process and configuration in a day through trial and error. I'm by no means an expert on Webpack now but this is a great starting point as I venture deeper. Goodbye crazy, long, unmaintainable files and hello sanity!