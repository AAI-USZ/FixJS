function(err, component) {
          req = elementReq;

          elements.add(req, db, function(err, element) {
            req = componentReq;

            components.remove(req, db, 3, function(err) {
              should.not.exist(err);
              elements.list(req, db, function(err, elementList) {
                elementList.should.eql([]);
                done();
              });
            });
          });
        }