function(p) {
        if (p[0] !== '.' && path.existsSync(path.join(p,'.meteor'))) {
          var dir = p;
          var name = p;
          if(p !== 'root'){
            if(argv.prefix)
              name = argv.prefix + '-' + p;

            name = subapp_prefix + name;
          }

          meteors[name] = {
            name: name,
            port: new_argv.port+portsPerApp*nMeteors+1,
            dir: dir
          }
          nMeteors++;
        }
      }