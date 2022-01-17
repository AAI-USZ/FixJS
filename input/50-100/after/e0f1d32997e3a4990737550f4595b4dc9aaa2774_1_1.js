function(res){
            res.headers.should.have.property('set-cookie');

            app.request()
            .get('/admin')
            .set('Cookie', 'connect.sid=' + sid(res))
            .end(function(res){
              res.headers.should.not.have.property('set-cookie');
              done();
            })
          }