function(data) {
              editor.save();
              //console.log('saved');
              setTimeout(function() {
                window.location.href = 'index.html';
              }, 750);
            }