function(err, user)
      { 
         if(err) { return done(err); }
         if(!user) { return done(null, false, { message: 'Unknown user ' + username }); }
         client.query(
            'SELECT user, pass FROM ' + credTb + ' WHERE pass = SHA1(\'' + password + '\')',
            function selectCb(err, results, fields, fn) 
            {
              if(err) 
              {
                throw err;
              }
              if(results[0] == undefined)
              {
                switcher(err, user, false, done);
              }
              else if(user === results[0].user)
              {
                switcher(err, user, true, done);
              }
              else
              {
                switcher(err, user, false, done);
              }
            }
          );
      }