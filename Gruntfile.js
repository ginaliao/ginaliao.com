module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Adds vendor prefixes
    autoprefixer: {
      options: {
        browsers: ['last 2 version', '> 1%', 'ie 8', 'ie 9']
      },
      css: {
        expand: true,
        src: ['dist/css/*.css']
      }
    },
    // Creates server, viewable on any device on the same network
    browserSync: {
      dev: {
        bsFiles: {
          src: ['dist/**/*']
        },
        options: {
          watchTask: true,
          server: './dist'
        }
      }
    },
    // Copies files
    copy: {
      images: {
        expand: true,
        cwd: 'src/img/',
        src: '**/*',
        dest: 'dist/img/'
      },
      js: {
        expand: true,
        cwd: 'src/js/',
        src: '**/*',
        dest: 'dist/js/'
        
      }
    },
    // Minifies CSS
    cssmin: {
      options: {
        advanced: false
      }
    },
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          'dist/js/scripts.js',
          'dist/css/{,*/}*.css'
        ]
      }
    },
    // Create fallbacks for SVG icons
    grunticon: {
      options: {
        enhanceSVG: true
      },
      icons: {
        files: [{
          expand: true,
          cwd: 'src/img/icons/compressed',
          src: '*.svg',
          dest: 'src/img/icons'
        }],
        options: {
          cssprefix: '.icon--',
          pngpath: '../img/icons/png'
        }
      }
    },
    // Optimises images
    imageoptim: {
      options: {
        quitAfter: true
      },
      jpgs: {
        options: {
          jpegMini: false,
          imageAlpha: false,
          quitAfter: true
        },
        src: ['dist/img/*.jpg']
      },
      pngs: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['dist/img/*.png']
      },
      gifs: {
        options: {
          jpegMini: false,
          imageAlpha: false,
          quitAfter: true
        },
        src: ['dist/img/*.gif']
      }
    },
    // Tests JavaScript code quality
    jshint: {
      options: {
        newcap: false,
        reporter: require('jshint-stylish')
      },
      dev: {
        src: ['src/js/main.js']
      }
    },
    // Compiles Sass to CSS
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded',
          sourceMap: false
        },
        files: {
          'dist/css/style.css': 'src/_scss/style.scss'
        }
      }
    },
    // Run Jekyll build
    shell: {
      jekyllBuild: {
        command: 'bundle exec jekyll build'
      }
    },
    // Optimises SVGs
    svgmin: {
      options: {
        plugins: [
          { convertPathData: false },
          { cleanupIDs: false },
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false } 
        ]
      },
      dist: {
        expand: true,
        cwd: 'src/img/icons/raw',
        src: '*.svg',
        dest: 'src/img/icons/compressed'
      }
    },
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'dist/index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/css/{,*/}*.css'],
      options: {
        assetsDirs: ['dist', 'dist/img']
      }
    },
    // Watches files for changes
    watch: {
      images: {
        files: ['src/img/*', '!src/img/icons/**/*'],
        tasks: ['imageoptim', 'copy:images']
      },
      icons: {
        files: ['src/img/icons/**/*'],
        tasks: ['svgmin', 'grunticon', 'copy:images']
      },
      content: {
        files: ['src/**/*.{html,md}', 'src/_includes/*.html', 'src/_layouts/*.html', 'src/_posts/*.html'],
        tasks: ['shell:jekyllBuild', 'sass', 'autoprefixer']
      },
      scripts: {
        files: 'src/js/**/*.js',
        tasks: ['newer:jshint', 'copy:js']
      },
      stylesheets: {
        files: 'src/_scss/**/*.scss',
        tasks: ['sass', 'autoprefixer']
      }
    }
  });

  grunt.registerTask('default', ['build', 'imageoptim', 'browserSync', 'watch']);
  grunt.registerTask('build', ['svgmin', 'grunticon', 'shell:jekyllBuild', 'sass', 'autoprefixer']);
  grunt.registerTask('dist', ['build', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin']);
};