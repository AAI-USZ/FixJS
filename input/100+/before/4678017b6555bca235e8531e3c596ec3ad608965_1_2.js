function (exists) {
  if (exists) {
    var exec = require('child_process').exec;
    exec("git log -n1 --format=%h",
         function (err, stdout, stderr) {
          version = 'commit ' + stdout;
        }
    );
  } else {
    path.exists(__dirname + '/package.json', function (exists) {
      if (exists) {
        fs.readFile(__dirname + '/package.json', 'utf8', function (err, data) {
          if (err !== null) console.log(err);
          else
            try {
              version = JSON.parse(data).version;
            } catch (err) {
              console.log(err);
            }
        });
      } else {
        path.exists(__dirname + '/../ircnode/package.json', function (exists) {
          if (exists) {
            fs.readFile(__dirname + '/../ircnode/package.json', 'utf8', function (err, data) {
              if (err !== null) console.log(err);
              else
                try {
                  version = JSON.parse(data).version;
                } catch (err) {
                  console.log(err);
                }
            });
          }
        });
      }
    });
  }
}