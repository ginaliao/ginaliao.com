---
layout: post.njk
title: 5 Things I Wish I Knew Before
category: Tips
tags: post
---

I began learning how to build websites somewhere towards the end of 2008 (although, if I had to be honest, I can remember making an attempt at building a Pokemon website on Geocities in my pre-teens). Only in the last year have I been [really, really] seriously developing my web development skills and I’ve still learned a tonne. I want to share some things that I think any budding front-end developer should know that might not be immediately obvious when you first start out.

## You need to know JavaScript/jQuery

I spent the first few years of learning web development focused on HTML, CSS and even integrating WordPress, yet almost completely ignoring JavaScript. The extent of my exposure to JavaScript was turning to jQuery plugins when I needed a shiny slider or lightbox. Even then, I had absolutely no understanding of what jQuery was or did.

Looking back, I can’t stress enough how important it is to get a good grip on jQuery. Although, if you have no programming experience, I’d highly recommend learning at least the basics of vanilla JavaScript first before tackling jQuery: variables, primitive types, arrays, objects, functions, loops etc.

A few handy resources that set me in the right direction: [30 Days to Learn jQuery](https://tutsplus.com/course/30-days-to-learn-jquery/), [Modern JavaScript](http://www.larryullman.com/books/modern-javascript-develop-and-design/) and [Codecademy](http://www.codecademy.com/tracks/javascript).

## Start preprocessing CSS now

A CSS preprocessor is basically CSS on steroids. In other words, it takes the best bits from the programming world (variables, functions, calculations) so you can write easily maintainable stylesheets that get compiled to plain CSS.

I first avoided CSS preprocessors because I didn’t think it was necessary to add another layer to my workflow. With terms like gems, command line, compile, it all seemed too complicated. I recently started using [Sass](http://sass-lang.com/) and it’s completely changed the way I approach CSS.

You don’t need to utilise the entire feature set of Sass from the get-go – in fact, I advise that you don’t. I know I tried to do everything at once and it confused the heck out of me. You can add a preprocessor to your workflow nice and slowly by incorporating small bits here and there until you get used to it. Sass is just CSS anyway.

Here are a few basic things you can pick up and use right away:

### Variables

```scss
/* Super cool for setting brand colours */
$crimson: #DC143C;
$brand-primary: $crimson;
```

### Imports

```scss
/* Imports partials (in the format _reset.scss) */
@import 'reset';
@import 'global';
```

### Nesting

```scss
/* Super nifty for things like pseudo states.
   But don't nest too deep! */
a {
	border-bottom: 1px dotted $brand-primary;
	color: $brand-primary;
	&:hover {
		border: none;
		color: #333;
	}
}
```

Compiles to:

```scss
a {
	border-bottom: 1px dotted #DC143C;
	color: #DC143C;
}

a:hover {
	border: none;
	color: #333;
}
```

### Placeholders

```scss
/* Placeholders don't get generated in your CSS */
%polaroid {
	border: 1px solid #E6E6E6;
	img { margin: 0; }
	p { padding: 1em; }
}

.gallery-item {
	@extend %polaroid;
}
```

Compiles to:

```scss
.gallery-item {
	border: 1px solid #E6E6E6;
}

.gallery-item img {
	margin: 0;
}

.gallery-item p {
	padding: 1em;
}
```

### Built-in Functions

```scss
p {
	color: lighten($crimson, 10%);
}
```

## Use a version control system

As a solo web developer, I didn’t think it was necessary to use a proper VCS. But my current setup had issues: Dropbox’s version tracking only lasts up to 30 days on a free account and I may not be the only developer in future projects. With no excuses left, I read some tutorials and scoured the web for resources. To my delight, I found [Bitbucket](http://bitbucket.org/) (free Git repository hosting) and [SourceTree](http://www.sourcetreeapp.com/) (its counterpart GUI app).

I’ve now incorporated Git into the workflow of the current projects I’m working on. So far I haven’t had to do any rollbacks, pulling or merging, but I can at least rest assured that I have that option if the need arises. Plus, it’s always fun to look at the timeline and see how my code has changed over time.

## It’s easy(ish) to get responsive

A ridiculous amount of devices with various screen sizes are coming out regularly so it’s important that websites can contort to any size and still remain readable/usable.

At its most basic, the magic is in your CSS. The following are the 3 principles of RWD:

* Flexible grid
* Flexible media
* Media queries

A few media queries at different breakpoints will get you halfway there. Simple things like adding `width: auto` or `float: none` to columns to get them to collapse. This is just the tip of the iceberg, as website performance becomes paramount and you need to implement things such as conditional loading, account for touch etc.

## Website speed matters

Website speed is a huge deal now with the rise of mobile browsing. It also factors into search engine rankings and customer retention (who wants to browse a slow website, right?). Good thing is that there’s lots of simple steps to improve website performance:

### Analyse it

Running your website through a tool such as [GTMetrix](http://gtmetrix.com/) will give a good indication of what work needs to be done to optimise speed. They generate reports and tell you where you can improve on.

### Styles at the top, scripts at the bottom

The order of your CSS and JavaScript files in the document is important as they are generally downloaded and parsed sequentially. CSS should be included as high up in the document as possible to avoid FOUC (Flash Of Unstyled Content). You generally don’t want JavaScript in the head as it’ll block the rendering of the page and therefore defeating its entire purpose of DOM manipulation. You can delay the downloading of scripts by including them just before the closing body tag.

### Gotta concatenate them all

Every CSS or JS file is another HTTP request – and you don’t want too many of those. For most basic-medium sized websites, having one CSS file is fine. JS files on the other hand are a bit iffy. I personally like to have all my jQuery plugins in one file and all my custom site scripts in another. If there’s a big plugin or feature that’s page-specific, I’ll separate it out and call it on that particular page only.

### Uglify (minify) it

To get that extra squeeze on your concatenated files, you should minify them. What this does is strip out all the comments and white spaces and basically turns it into a one line freakish looking thing. You could essentially halve the size of your files by minifying.

### Optimise your images

You might try shaving off bytes by optimising your CSS or JavaScript, but optimising your images is where you can make the most difference.

The first you want to do is save the image in the correct format. This is the general rule of thumb:

* **JPG**: use for photos or images with a bajillion colours (save around 60-70% quality)
* **PNG-8**: use for illustrations or images with large areas of solid colour
* **PNG-24**: use (sparingly) for images that require alpha transparency
* **GIF**: use PNG-8 (although you can use this for animated gifs)

Once you’ve got the appropriate format, run it through an image optimiser program. Notable ones are: [ImageOptim](http://imageoptim.com/), [ImageAlpha](http://pngmini.com/), [SmushIt](http://smushit.com/), [JPEGMini](http://jpegmini.com/).

It’s so ridiculously simple you want to smack yourself in the face for not doing it sooner.

### Gzip

If you know about zipping, gzipping is basically the server-side/browser equivalent. There’s some .htaccess voodoo involved that tells the server to serve compressed assets (HTML, CSS, JavaScript etc.). If the client browser has the ability to deflate (or “unzip”), then when a page is requested, the server sends the compressed assets which the browser will unpack before being displayed as usual. That means less to download and faster speeds.

Easiest solution: add the .htaccess file (note: this is a hidden file) included in the [HTML5 Boilerplate](http://html5boilerplate.com/) to the root of your directory and you’re good to go.

## Conclusion

There are no hard and fast rules in web development, but I think these tips should serve as a basic foundation for any front-end developer. It pains me to think I only discovered these things in the last year or so, but hey, we all gotta start somewhere.