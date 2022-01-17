function() {
              error('Cloning ' + self.url);
              var handler = errorHandler('Error cloning ' + self.url + ' to ' + self.basePath, done, done);
              exec('git', ['clone', '--mirror', self.url, self.basePath], { cwd: './', quietError: true }, handler);
            }