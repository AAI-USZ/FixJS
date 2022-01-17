function(res){
        expect(res[0].relTypes).to.eql(["pinches"]);
        expect(res[1].relTypes).to.eql(["views"]);
        expect(res[2].relTypes).to.eql(["views", "pinches"]);
      }