module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		combo : {
			build: {
				files: [{
					expand: true,
					cwd: 'script-ss/',
					src: ['www/page/**/*.js', 'm/page/**/*.js'],
					dest: 'script-min/',
					ext: '.js'
				}]
			}
		},
        uglify: {  
            build: {  
				files: [{
					expand: true,
					cwd: 'script-min',
					src: ['www/page/**/*.js', 'm/page/**/*.js'],
					dest: 'script-min'
				}
				, {
					expand: true,
					cwd: 'script-ss',
					src: ['jquery/jquery.js', 'zepto/zepto.js'],
					dest: 'script-min'
				}]
            }  
        },  
		less: {
			options: {
				paths: ['less'],
				compress: true,
				yuicompress: true,
				optimization: 2
			},
			compile: {
				expand: true,
				cwd: 'less',
				src: ['www/base.less', 'www/page/**/*.less', 'm/base.less', 'm/page/**/*.less'],  
				dest: 'css/',
				ext: '.css'
			}
        },  
		watch: {
			less: {
				files: ['less/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			},
			combo: {
				files: ['script-ss/**/*.js'],
				tasks: ['combo'],
				options: {
					spawn: false,
				},
			}
		}

    });  
  
    grunt.loadNpmTasks('grunt-cmd-combo');  
    grunt.loadNpmTasks('grunt-contrib-uglify');  

	grunt.loadNpmTasks('grunt-contrib-less')
	grunt.loadNpmTasks('grunt-contrib-watch')
  
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('mkcss', ['less']);
    grunt.registerTask('normal', ['combo']);
    grunt.registerTask('min', ['combo', 'uglify']);
    grunt.registerTask('build', ['less', 'combo', 'uglify']);
};
