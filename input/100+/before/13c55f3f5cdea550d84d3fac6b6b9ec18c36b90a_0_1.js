function(dir){
          if(!dir || dir == '.') {
            dir = path.resolve('.');
          }
          cli.msg(meta.name + ' (v' + meta.version + '): ' + 'I am Starting the server and watching '+dir+', Sir');
          if (path.existsSync(dir)) {
            server.preview(dir);
            filename = './' + dir + '/stylesheets/app.less';
            cli.msg('Server at http://localhost:'+perkins.port);
            cli.info('Watching... to stop press Ctrl+C');
            fs.watchFile(filename,
              function(curr, prev) {
                originalFile = prev.mtime.getTime();
                currentFile = curr.ctime.getTime();
                cli.info('Reading the file: '+filename);
                if (originalFile != currentFile) {
                  fs.readFile(filename, 'utf-8', function(err, data){
                    cli.info('Exporting to CSS');
                    parser = new(less.Parser)({
                      paths : [ './'+dir , './'+dir+'/stylesheets'],
                      filename: './'+dir+'/'+ filename
                    });
                    parser.parse(data, function(err, tree){
                      if (err) { return cli.error(err) }
                      css = tree.toCSS({compress: perkins.min});
                      fs.writeFile('./'+dir+'/out/stylesheets/style.css', css, 'utf8', function(err) {
                        if (err) throw err;
                        cli.info('Sir '+dir+'/out/style.css has been updateded');
                      });
                    });
                  });
                } else {
                  cli.info('Watching '+dir+' to stop press Ctrl+C');
                }
              });
          } else {
            cli.error('Sorry, Sir but '+ dir + 'does not exists');
          }
      }