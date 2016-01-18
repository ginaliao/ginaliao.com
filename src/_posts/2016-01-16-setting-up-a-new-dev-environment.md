---
layout: post
title: Setting Up a New Dev Environment
category: Workflow
---

This post is for past me who used to install everything without thinking about it, leaving a trail of cruft in my machine.

After setting up a few development environments (and after hours of frustrating permission issues and other errors), I finally have a solid workflow for installing Node, Grunt and Sass. There's a bit of command line involved, but it's worth taking it a step further and installing a few version managers which will save headaches in the future if it's necessary to go back and forth between versions.

Note: This setup is for Mac OS X.

Also note: I don't presume to know what I'm talking about when it comes to command line here. This is just how I've interpreted the many guides I've read.

## Install nvm (Node Version Manager)

I've had issues with versions of Node.js that have been installed through the installer on the official website. Doing so meant that every time I needed to install a Node package, I had to use sudo (meaning running programs as root admin which is a big no-no) due to the location of the install.

That's where [nvm](https://github.com/creationix/nvm) comes in. What's great about using nvm is that it installs a self-contained version of Node.js elsewhere and points to it, making it easy to jump to multiple installations.

Previously I had installed nvm through Homebrew (an OS X package manager), but have recently read that this is not recommended as it's easily outdated and it's not really all that necessary to manage a package manager with a package manager.

Instead, install nvm directly. If you're on Mac OS X, open up the Terminal app that comes installed by default.

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
```

After it's installed, the install script should automatically add a few lines to your profile (basically a hidden configuration file for your command line interface) for you. If not, you'll just need to edit the file yourself. For Mac OS, this would be .bash_profile which is found in `/Users/username/`.

If there's no .bash_profile there, create one and add the following, making sure to change **username** to your own.

```
export NVM_DIR="/Users/username/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

Reload Terminal.

Now it's time to install Node. This will also automatically install npm.

```
nvm install 4.2.4
```

To run this version of Node by default:

```
nvm alias default node
```

### Upgrading Node

Global packages are isolated within each separate version of Node, so after upgrading, you'll need to reinstall your desired packages. Alternatively, you can install the latest Node version and reinstall packages from the version of Node last used with the following command:

```
nvm install node --reinstall-packages-from=node
```

## Install Grunt

Now we can globally install Grunt (and any other global Node packages) without using sudo. Hurrah!

```
npm install -g grunt-cli
```

## Install RVM (Ruby Version Manager)

```
\curl -sSL https://get.rvm.io | bash -s stable
```

Installing [RVM](https://rvm.io/) should add a line to your `~/.bash_profile` so that it's loaded whenever you open up Terminal.

Then run it once (or restart your Terminal).

```
source ~/.rvm/scripts/rvm
```

Now we can install Ruby.

```
rvm install 2.3.0
```

Typing `which ruby` will let you know if the system is using the version of Ruby just installed with RVM or if it's using the default system version.

### Upgrading Ruby

Similar to nvm, each version of Ruby has its own separate gem directory, so you'll have to either reinstall the required gems or move them.

The following command will upgrade to the specified version and move installed gems to the new version's location:

```
rvm upgrade 2.3.0 2.4.0
```

## Install Sass

It's as simple as...

```
gem install sass
```

## Conclusion

And that's it! Now you can non-destructively jump to different versions of Node and Ruby as well as painlessly install dependencies without fear of permission errors or giving root privileges.