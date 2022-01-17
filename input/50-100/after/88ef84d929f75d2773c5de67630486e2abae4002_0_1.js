function(data) {
          data.submitted = true;
          p.settings.db.saveDoc(data, {
            success: function(data) {
              editor.save();
              //console.log('saved');
              setTimeout(function() {
                window.location.href = 'index.html';
              }, 750);
            },
            error: function() {
              alert('Unable to update document ' + report_id);
            }
          });
          return false;
        }