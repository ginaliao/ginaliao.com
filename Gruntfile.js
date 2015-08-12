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
					src: ['dist/css/*.css', 'dist/{,*/}*.html']
				},
				options: {
					watchTask: true,
					server: './dist'
				}
			}
		},
		// Removes folders/files
		clean: {
			all: ['dist'],
			icons: ['src/img/icons/*', '!src/img/icons/compressed/**', '!src/img/icons/raw/**']
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
		// Optimises images
		imageoptim: {
			options: { quitAfter: true },
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
					style: 'expanded',
					sourcemap: 'none'
				},
				expand: true,
				flatten: true,
				ext: '.css',
				src: 'src/_scss/*.scss',
				dest: 'dist/css/'
			}
		},
		// Run Jekyll build
		shell: {
			jekyllBuild: {
				command: 'jekyll build'
			}
		},
		// Optimises SVGs
		svgmin: {
			options: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false }
				]
			},
			dist: {
				expand: true,
				cwd: 'src/img/icons/raw',
				src: ['*.svg'],
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
			content: {
				files: ['src/**/*.{html,md}', 'src/_includes/*.html', 'src/_layouts/*.html', 'src/_posts/*.html', 'src/img/*'],
				tasks: ['shell:jekyllBuild', 'sass', 'autoprefixer']
			},
			scripts: {
				files: 'src/js/**/*.js',
				tasks: ['newer:jshint', 'shell:jekyllBuild']
			},
			stylesheets: {
				files: 'src/_scss/**/*.scss',
				tasks: ['sass', 'autoprefixer']
			}
		}
	});

	grunt.registerTask('default', ['build', 'browserSync', 'watch']);
	grunt.registerTask('build', ['clean:icons', 'shell:jekyllBuild', 'sass', 'autoprefixer']);
	grunt.registerTask('dist', ['build', 'imageoptim', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin']);
};