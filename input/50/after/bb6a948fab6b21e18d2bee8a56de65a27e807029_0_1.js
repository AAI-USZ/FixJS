function(result) {
        expect(result).to.have.length(5);
        expect(result.join(' ')).to.be('Adam Alex Matt Paul Rebecca');
        done();
      }