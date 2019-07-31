module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: true
      },
      build: {
//        src: ['src/js/view.js', 'src/js/model.js', 'src/js/controller.js',
//          'src/js/shopping-list-item.js', 'src/js/ui.js'],
        src: ['src/js/*.js', '!src/js/ui.js', 'src/js/ui.js'],
        dest: 'build/<%= pkg.name %>.min.js'
      },
      cssmin: {
        target: {
          // Minimise everything in to one
//        files: {
//          'build/css/style.min.css': ['src/css/*.css']
//        }
          // Minimise each file separately
          files: [{
            expand: true,
            cwd: 'src/css',
            src: ['*.css'],
            dest: 'build/css',
            ext: '.min.css'
          }]
        }
      },
      copy: {
        html: {
          src: 'src/html/index.prod.html',
          dest: 'build/index.html'
        },
        static: {
          files: [{
            expand: true,
            cwd: 'src/static',
            src: '*.*',
            dest: 'build/static',
          }]
        }
      },
      less: {
        build: {
          files: {
            'src/css/headings.css': 'src/css/headings.less'
          }
        }
      },
      watch: {
        css: {
          files: 'src/css/*.css',
          tasks: ['cssmin']
        },
        scripts: {
          files: 'src/js/*.js',
          tasks: ['uglify']
        },
        html: {
          files: 'src/html/index.prod.html',
          tasks: ['copy:html']
        },
        static: {
          files: 'src/static/*.*',
          tasks: ['copy:static']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy']);
};