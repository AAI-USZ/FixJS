function(enclosure) {
          enclosure.should.have.property('href');
          enclosure.should.have.property('title');
          enclosure.should.have.property('type');
          enclosure.should.have.property('hash');
          enclosure.hash.length.should.equal('sha-512:'.length + 128);
        }