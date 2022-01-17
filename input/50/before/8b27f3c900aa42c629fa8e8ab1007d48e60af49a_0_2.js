function(){
            req.session.migrationFile = migration.id;
            res.redirect('/migration/mapping/' + migration.id);
          }