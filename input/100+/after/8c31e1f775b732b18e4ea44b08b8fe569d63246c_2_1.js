function() {
      var json = Types.updateAttributes({foo : "Bar", count : 0});

      json.should.eql({
        "foo":{"Value":{"S":"Bar"},"Action":"PUT"},
        "count":{"Value":{"N":"0"},"Action":"PUT"}
      });

    }