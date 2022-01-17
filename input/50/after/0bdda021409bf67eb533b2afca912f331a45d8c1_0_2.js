function(req, file, parsedData) {
        saveMigration(req, file, parsedData, function(req, migration) {
          req.session.migrationFile = migration.id;
          res.redirect('/migration/mapping/' + migration.id);
        });
      }