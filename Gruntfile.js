'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        src: {
            // This will cover all JS files in 'js' and sub-folders
            js: ['app/js/**/*.js'],
            templates: ['app/partials/**/*.html']
        },

        clean: [
            'test-results',
            'coverage'
        ],

        //JS Test files
        test: {
            karmaConfig: 'test/karma.conf.js',
            unit: ['test/unit/**/*.js']
        },

        // Configure Lint\JSHint Task
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: {
                src: ['Gruntfile.js', '<%= src.js %>', '<%= test.unit %>']
            }
        },

        karma: {
            dev: {
                configFile: '<%= test.karmaConfig %>',
                singleRun: false
            },
            ci: {
                configFile: '<%= test.karmaConfig %>',
                singleRun: true
            }
        },

        // copy coverage results to static location
        copy: {
            coverage: {
                files: [
                    {
                        expand: true,
                        src: ['test-results/Phantom*/**/*'],
                        dest: 'test-results/coverage/',
                        rename: function (dest, src) {
                            return dest + src.replace(/test-results\/Phantom[^\/]+\//, '/');
                        }
                    }
                ]
            },
            deploy: {
                files: [
                    {
                        expand: true,
                        src: ['**'],
                        dest: '/var/www',
                        cwd: 'app/'
                    }
                ]
            }
        },

        sass: {
            dist: {
                files: {
                    'app/css/app.css': 'sass/main.scss'
                }
            }
        },

        connect: {
            web: {
                options: {
                    port: 9000,
                    bases: '.',
                    keepalive: true
                }
            }
        },

        watch: {
            jshint: {
                files: ["<%= src.js %>", "<%= test.unit %>"],
                tasks: ['jshint']
            },
            sass: {
                files: ["**/.scss"],
                tasks: ['sass:dist']
            },
            karma: {
                files: ["<%= src.js %>", "<%= test.unit %>"],
                tasks: ['karma:dev']
            }
        },

        concurrent: {
            dev: {
                tasks: ['watch', 'watch-tests', 'web'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('web', ['connect:web']);
    grunt.registerTask('watch-tests', ['karma:dev']);
    grunt.registerTask('default', ['clean', 'concurrent:dev']);
    grunt.registerTask('ci', ['clean', 'karma:ci', 'copy:coverage', 'sass', 'copy:deploy']);
};
