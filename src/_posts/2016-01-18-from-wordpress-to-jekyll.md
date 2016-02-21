---
layout: post
title: From WordPress to Jekyll
category: Workflow
---

Having recently used [Jekyll](http://jekyllrb.com) for a client website, I was inspired to step away from overly complicated CMSes and use a static site generator for my website. It's been a long time coming for many reasons:

* My site has been in need of a serious overhaul (it was built in the early stages of my career and never updated to reflect best practices I've picked up)
* WordPress has way too many features for what was really a simple blog with a couple of extra pages
* The constant need to update WordPress and plugins for security reasons
* My login script has been automatically disabled by my web host on several occasions due to the volume of brute force login attempts
* To save in web hosting costs

## Jekyll to the rescue

Contrary to the title of this post, I'm not going to delve too deeply into Jekyll. What I will do is list some of my favourite things about using it:

* Keeping things DRY with includes and loops
* Collections aka the Custom Post Types of Jekyll
* Writing my posts in Markdown
* Using filters to transform text
* Syntax highlighting without using a JavaScript plugin

## Fuss-free forms

Given the static nature of Jekyll, I used [FormSpree](http://formspree.io/), a third-party service for form processing. It's as simple as adding `//formspree.io/your@email.com` to the form `action` attribute. Once your form is submitted, it will send an email to the provided email address with all the inputs you've added to your form.

There are a few special FormSpree inputs you can add too if you want to do things such as configure a redirect or enable spam protection.

Best of all, it's free!

## Hammering in a new build process

We human beings are lazy creatures and shun boring, repetitive tasks. Especially now with a huge focus on web performance, we must optimise all our files, whether it be concatenating, minifying or testing. That's where automation comes in and these days, [Grunt](http://gruntjs.com/) and [Gulp](http://gulpjs.com/) are all the rage.

Hopping on the task runner bandwagon a tad late, I chose to use Grunt due to its popularity and longevity. I've set up my Gruntfile to watch for changes and run `jekyll build`, and all the general compiling, linting and optimising as required.

While it's great that we've got task runners that can do all the boring stuff, it feels a bit icky to commit both your original source files as well as your generated/optimised files (not to mention the merge conflict headache that will sooner or later ensue if you use version control). 

A simple solution is to have a build run automatically from your committed source files and then deploy the generated files. What's great is that I can leave the final optimisations (concatenating and minifying) to the very last step, leaving my local environment much more easily debuggable.

Previously I've used [Wercker](http://wercker.com/) for running tests/builds but I wanted to try out [CodeShip](http://codeship.com/) after hearing great things about it. They have a free plan (even better, there are no build restrictions on public repositories) so I thought, why not?

It was suprisingly straightforward to set up.

Upon signing up to CodeShip, you give it access to your SCM (such as [GitHub](http://github.com/)), choose a project repository and configure test settings. The test settings is where you set up the build system similarly to your local system. I use the following commands:

#### Setup Commands

```
rvm use 2.2.0 --install
gem install bundler
bundle install --deployment
npm install grunt-cli
npm install
```

The above commands will install the desired Ruby version, Bundler (a gem dependency package manager), the gems listed in the `Gemfile` with Bundler, the Grunt command line and Node modules (Grunt plugins for the most part) specified in `package.json`.

#### Configure Test Pipelines

```
grunt dist
```

Then, `grunt dist` is run after everything is succesfully installed in the Setup Commands step.

## One-line deployment

Once CodeShip has run my `grunt dist` task and built all the files, I can deploy to my server with one line of code with rsync (a Linux utility for keeping directories in sync).

In order for rsync to transfer files to my server without a password, an SSH key must be added. There's different ways to do this based on your hosting provider, but for my host [NearlyFreeSpeech.net](https://www.nearlyfreespeech.net/), it's as easy as adding the SSH public key provided by CodeShip to your keychain. You can [find out how to do this](https://faq.nearlyfreespeech.net/section/uploading/sshkeys#sshkeys) on their website.

On the deployment configuration page in CodeShip, I chose to use a custom script with the following command:

```
rsync -vrzc --delete --exclude '.htaccess' ~/clone/dist/ [USERNAME]@[SERVER]:[PATH/TO/TARGET/]
```

A breakdown of what all the arguments are:

* **`-v`**: verbose (prints to screen what's being transferred)
* **`-r`**: recursive (it transfers all directories and subdirectories)
* **`-z`**: compress (compresses the files during transfer)
* **`-c`**: checksum (as my Grunt task builds new files everytime, it's more efficient to check by the size rather than timestamp otherwise all files would be transferred over everytime)
* **`--delete`**: deletes any files in the target location that are not in the source location
* **`--exclude`**: excludes files to sync in either the source or target location (in my case I had a staging site-specific .htaccess file I manually uploaded)
* **`~/clone/dist`**: the source location (with CodeShip, files are put in a /clone folder; in my case, my built files are within the /dist folder)
* **`[USERNAME]@[SERVER]:[PATH/TO/TARGET/]`**: target server details

Take note of the '/' after the source and target locations. rsync will copy everything within the last specified folders but not include the folder itself.

Magic!

## Why not host on GitHub Pages?

I made a conscious decision to not utilise free hosting on GitHub Pages for two reasons. The first reason being that I wanted to have absolute control over my build process rather than being restricted to a simple `jekyll build` command. This also allowed me to use Jekyll plugins as needed without any restrictions.

The second reason being I've been using NearlyFreeSpeech to host my personal website for nearly my entire career. It's cheap pay-as-you-go hosting and I've never had to spend more than a few dollars a year. In hosting a WordPress website, there were some extra costs for the MySQL database and PHP. Now I only have to pay for hosting a static site (which should now cost 2-3 times less), but I get the added benefit of messing around with SSH, DNS and other hacky things.

There is, however, one caveat to using NearlyFreeSpeech and that is that it doesn't support server-side gzipping. Instead, I had to "automanually" run a separate Grunt task to gzip my assets with [grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress) (e.g. turning `scripts.js` into `scripts.js.gz`).

Then I popped the following into my .`htaccess`:

```
RewriteEngine on
RewriteCond %{HTTP:accept-encoding} gzip
RewriteCond %{REQUEST_FILENAME} !\.gz$
RewriteCond %{REQUEST_FILENAME}.gz -f
RewriteRule (.*) $1.gz [L]
```

## Conclusion

What it comes down to is what your requirements are. For me, I'm practical, lazy and cheap so this worked out quite well (hehe). Be sure to check out what's under the hood of this website on [GitHub](https://github.com/ginaliao/ginaliao.com).

## Resources

[Front End Deployment For The Rest of Us](http://medoingthings.com/writing/2015/03/front-end-deployment-for-the-rest-of-us)
[Deploying a Jekyll website using Rsync](https://www.basbarten.nl/jekyll-deployment/2014/deploying-a-jekyll-website-using-rsync/)
[Rsyncing Jekyll](http://nathangrigg.net/2012/04/rsyncing-jekyll/)