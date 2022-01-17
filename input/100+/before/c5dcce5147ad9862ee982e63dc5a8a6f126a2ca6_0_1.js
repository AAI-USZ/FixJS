function(){
    it('should prefix properties', function(){
      rework(fixture('prefix'))
        .prefix('border-radius', ['-webkit-', '-moz-'])
        .toString()
        .should.equal(fixture('prefix.out'));
    })

    describe('when "@keyframes" is given', function(){
      it('should prefix @keyframes', function(){
        var str = rework(fixture('keyframes'))
          .prefix('@keyframes', ['-webkit-', '-moz-'])
          .toString()
          .should.equal(fixture('keyframes.out'));
      })

      it('should prefix only using the parent vendor prefix', function(){
        rework(fixture('keyframes.props'))
          .prefix('border-radius', ['-webkit-', '-moz-'])
          .prefix('@keyframes', ['-webkit-', '-moz-'])
          .toString()
          .should.equal(fixture('keyframes.props.out'));
      })
    })
  }