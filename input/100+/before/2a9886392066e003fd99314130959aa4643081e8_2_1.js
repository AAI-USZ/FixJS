function (err, apps) {
    if (err)
      res.sendError(500, err.toString());
    else {
      var data = {}
      for (var i in apps) {
      
        var app = {name: apps[i]}
        app.path = path.resolve(appPath, app.name);
        app.loaded = app.name in global.QuickWeb.master.applist ? true : false;
        
        // 如果是zip文件
        if (path.extname(app.name) === '.zip') {
          app.loadact = 'unzipApp';
          app.loadactTitle = '解压';
        }
        else {
          // 检查目录里面是否有config.js文件，如果没有则忽略
          if (!app.loaded) {
            var confn = path.resolve(app.path, 'config.js');
            if (!path.existsSync(confn))
              continue;
          }
          app.loadact = app.loaded ? 'unloadApp' : 'loadApp';
          app.loadactTitle = app.loaded ? '卸载' : '载入';
        }

        data[app.name] = app;
      }
      
      res.renderFile('app_list.html', {app: data, message: res.___message});
    }
  }