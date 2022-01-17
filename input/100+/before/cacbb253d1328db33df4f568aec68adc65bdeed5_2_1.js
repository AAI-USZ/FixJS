function(err, dataset) {
            dataset.should.have.ownProperty('files');
            dataset.files.should.be.instanceof(Array);
            dataset.files.should.have.length(1);
            _.first(dataset.files).href.should.be.a('string');
            _.first(dataset.files).length.should.equal(4);
            _.first(dataset.files).title.should.be.a('string');
            _.first(dataset.files).type.should.equal('text/plain');
          }