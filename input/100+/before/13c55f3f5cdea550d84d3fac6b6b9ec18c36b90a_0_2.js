function(dir){
        if (path.existsSync(dir)) {
          cli.error('Sorry, Sir but '+dir+' already exists...');
        } 
        else {
          if (path.existsSync(rootDir +'/src')) {
            copypath = rootDir;
          }else{
            copypath = path.normalize(rootDir+'/../lib/node_modules/perkins');
          }
          cp.copyDirSyncRecursive(copypath +'/src', dir);
          cli.info('Default Perkins structure in '+dir+' created for you, Sir.');
          perkins.confirm('Did you want to execute the a Preview HTTP Server? ', function(ok){
            if(ok){
              server.preview(dir);
              cli.msg('Your preview server for '+dir+' is ready, Sir. on http://localhost:'+perkins.port);
              cli.info('You want to stop the preview? press Ctrl+C');
            }
            else {
              cli.msg('As you wish, Sir.');
              cli.info('If I may... You probably want to edit app.less');
              process.stdin.destroy();
            }
          })
        }
      }