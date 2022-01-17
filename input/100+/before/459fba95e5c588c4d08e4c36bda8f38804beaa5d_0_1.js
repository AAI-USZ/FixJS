function (content) {
      var overwrite = domstream(content);

      var elemOB = overwrite.find().only().elem('b').toValue();
      assert.ok(elemOB.elem = content.getElementsByTagName('b')[0]);

      describe('when overwriting content', testResult(function () {
        var node = elemOB.setContent('overwrite');

        describe('getting content', function () {
          var inner = node.getContent();

          it('should match expected result', function () {
            assert.equal(inner, 'overwrite');
          });
        });

        return node;
      }, '<a><b aa ab=b>overwrite</b><e></e><hr/></a>'));

      done();
    }