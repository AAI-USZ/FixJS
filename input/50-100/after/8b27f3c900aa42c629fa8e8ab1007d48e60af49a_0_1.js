function(count){
          log(parsedData);
          log('Number of lines: '+count);
          
          var migration = new (req.popit.model('Migration'))({
            source: {
              name: file.name,
              mime_type: file.type,
              parsed: parsedData
            }
          });

          migration.save(function(){
            req.session.migrationFile = migration.id;
            res.redirect('/migration/' + migration.id);
          });
        }