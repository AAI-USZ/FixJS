function (error, response, body) {
            if (!error && response.statusCode === 201) {//Status: 201 Created
              self.log.info('Pull Request to ' + user + '/' + repo + ' from ' + options.username + '/' + repo + ' Succesfull!');
              options.dbAddComplete(link);

              return cb(null, 'OK');
            } else {
              if (error === null) {
                try {
                  throw new Error(response.statusCode + ' ' + response.body.toString());
                }catch (err) {
                  self.log.error('submitPullRequest::error : ' + err);
                  return cb(null, 'DONE');
                }
              } else {
                //return cb(error);
                return cb(null, 'DONE');
              }
            }
          }