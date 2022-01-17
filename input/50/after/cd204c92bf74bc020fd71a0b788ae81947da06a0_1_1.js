function () {
      var target = sinon.stub(this.module, 'lookupMetadata');
      this.module._onUploadDone({}, {result: {}});

      assert.called(target);
    }