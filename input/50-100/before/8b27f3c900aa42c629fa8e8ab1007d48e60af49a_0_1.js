function(count){
          log(parsedData);
          log('Number of lines: '+count);
          
          var migration = new (req.popit.model('Migration'))({
            source: {
              mime_type: file.type,
              name: file.name,
              parsed: parsedData
            }
          });

          migration.save(function(){
            req.session.migrationFile = migration.id;
            res.redirect('/migration/mapping/' + migration.id);
          });
        }