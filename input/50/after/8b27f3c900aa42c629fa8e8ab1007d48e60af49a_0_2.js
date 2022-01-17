function(){
            req.session.migrationFile = migration.id;
            res.redirect('/migration/' + migration.id);
          }