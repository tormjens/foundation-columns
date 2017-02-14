module.exports = function( grunt ) {

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			foundation_columns: {
				src: [
					'assets/js/src/foundation_columns.js'
				],
				dest: 'assets/js/foundation_columns.js'
			}
		},
		uglify: {
			all: {
				files: {
					'assets/js/foundation_columns.min.js': ['assets/js/foundation_columns.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' * Licensed GPLv2+' +
						' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		watch:  {

			sass: {
				files: ['assets/css/sass/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},

			scripts: {
				files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		},
		clean: {
			main: ['release/<%= pkg.version %>'],
			trunk: ['plugin/trunk']
		},
		copy: {
			// Copy the plugin to a versioned release directory
			tag: {
				src:  [
					'**',
					'!node_modules/**',
					'!release/**',
					'!plugin/**',
					'!.git/**',
					'!js/src/**',
					'!img/src/**',
					'!Gruntfile.js',
          '!README.md',
					'!package.json',
					'!.gitignore',
					'!.gitmodules',
					'!assets/wordpress/banner/**',
					'!assets/wordpress/screenshots/**',
					'!assets/wordpress/**',
				],
				dest: 'plugin/tags/<%= pkg.version %>/'
			},
			banner: {
				cwd: 'assets/wordpress/banner/',
			    src: '*',
			    dest: 'plugin/assets/',
			    expand: true
			},
			screenshots: {
				cwd: 'assets/wordpress/screenshots/',
			    src: '*',
			    dest: 'plugin/tags/<%= pkg.version %>/',
			    expand: true
			},
			trunk: {
				cwd: 'plugin/tags/<%= pkg.version %>/',
			    src: '**',
			    dest: 'plugin/trunk/',
			    expand: true
			}
		},
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/foundation_columns.<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'release/<%= pkg.version %>/',
				src: ['**/*'],
				dest: 'foundation_columns/'
			}
		}
	} );

	// Load other tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );

	// Default task.

	grunt.registerTask( 'default', ['concat', 'uglify'] );


	grunt.registerTask( 'build', ['default', 'clean', 'copy', 'compress'] );

	grunt.util.linefeed = '\n';
};
