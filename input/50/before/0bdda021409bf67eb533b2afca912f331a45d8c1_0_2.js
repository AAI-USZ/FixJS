function(req, parsedData, file) {
        saveMigration(req, parsedData, file, function(req, migration) {
          req.session.migrationFile = migration.id;
          res.redirect('/migration/mapping/' + migration.id);
        });
      }