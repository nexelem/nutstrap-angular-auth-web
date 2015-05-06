module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    coffee:
      files:
        flatten: false
        expand: true
        cwd: "src/main/assets"
        src: ["**/*.coffee"]
        dest: "dist"
        ext: ".js"

    copy:
      index:
        src: 'partials/login/login.html',
        dest: 'dist/login.html'

    concat:
      dist:
        src: ['dist/user-module.js',
              'dist/Config.js',
              'dist/models/PermissionModel.js',
              'dist/models/UserModel.js',
              'dist/services/AuthService.js',
              'dist/controllers/auth/AuthCtrl.js',
              'dist/controllers/auth/LoginCtrl.js',
              'dist/interceptors/FlashResponseHttpInterceptor.js',
              'dist/directives/HasPermission.js'
        ],
        dest: 'dist/auth-module.min.js'

    uglify:
      dist :
        files: [{
          expand: true
          cwd: "dist/"
          src: '**/*.js'
          dest: "dist"
          flatten: false
        }],
        options: {
          mangle: false,
          compress: true
        }

  # Load tasks
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.registerTask 'default', ['coffee']
  grunt.registerTask 'dist', ['coffee', 'copy', 'concat', 'uglify']