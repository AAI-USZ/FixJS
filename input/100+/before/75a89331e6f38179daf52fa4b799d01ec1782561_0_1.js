function() {
    var res = {user:'',repo:''};
    var repo = grunt.file.readJSON(path.join(__dirname, '../package.json')).repository;
    if (repo.type === 'git' && _.isString(repo.url) && repo.url.indexOf('github.com') !== -1) {
      var arr = repo.url.split('/').slice(-2);
      res.user = arr[0];
      res.repo = arr[1].replace('.git', '');
    }
    return res;
  }