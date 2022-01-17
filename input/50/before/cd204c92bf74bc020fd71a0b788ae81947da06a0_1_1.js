function () {
      var target = sinon.stub(this.module, 'lookupMetadata');
      this.module._onUploadDone({}, {});

      assert.called(target);
    }