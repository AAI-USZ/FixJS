function(data, status, xhr) {

          alert(status);

          w.d.show('message', {

            title: 'Error',

            msg: 'An error occurred and '+currentDoc+' was not saved.'

          });

        }