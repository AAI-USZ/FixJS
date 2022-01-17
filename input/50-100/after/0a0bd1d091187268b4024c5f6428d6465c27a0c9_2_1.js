function(res){
        expect(res[0].relTypes).to.eql(["adds","pinches"]);
        expect(res[1].relTypes).to.eql(["adds","views"]);
        expect(res[2].relTypes).to.eql(["adds","views", "pinches"]);
      }