function (res) {
          if(res != 'err') {
            instaedit.displayNotification('Succesfully commited.', 'notification');
          } else {
            instaedit.displayNotification('Unkown error occurred during commit.', 'error');
          }
        }