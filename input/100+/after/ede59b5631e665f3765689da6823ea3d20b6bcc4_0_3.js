function(err, migrations) {
            var count, found, migration, version, versions, _i, _j, _k, _len, _len1, _len2;
            if (err) {
              return cb(err);
            }
            if (countOrVersion === "1") {
              if (existsSync("migrations/errfile")) {
                version = Fs.readFileSync("migrations/errfile", "utf8");
                console.log("Trying to recover from " + version + " error");
                return forceDown(schema, version, function(err) {
                  if (!err) {
                    Fs.unlinkSync("migrations/errfile");
                  }
                  return cb(err);
                });
              }
            }
            if (migrations.length === 0) {
              console.log("0 migrations found");
              return cb(null);
            }
            versions = [];
            if (countOrVersion === "all") {
              for (_i = 0, _len = migrations.length; _i < _len; _i++) {
                migration = migrations[_i];
                versions.push(migration.version);
              }
              return down(schema, versions, cb);
            } else if (countOrVersion.length < 3) {
              count = parseInt(countOrVersion);
              for (_j = 0, _len1 = migrations.length; _j < _len1; _j++) {
                migration = migrations[_j];
                versions.push(migration.version);
                count -= 1;
                if (count === 0) {
                  break;
                }
              }
              return down(schema, versions, cb);
            } else {
              version = countOrVersion;
              versions = [];
              for (_k = 0, _len2 = migrations.length; _k < _len2; _k++) {
                migration = migrations[_k];
                versions.push(migration.version);
                if (migration.version === version) {
                  found = migration;
                  break;
                }
              }
              if (found) {
                return down(schema, versions, cb);
              } else {
                return cb(null);
              }
            }
          }