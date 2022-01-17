function () {
    it('should request the metadata for the file', function () {
      var target = sinon.stub(this.module, 'lookupMetadata');
      this.module._onUploadDone({}, {result: {}});

      assert.called(target);
    });

    it('should call the fail handler if the "result" key in the data is undefined', function () {
      var target = sinon.stub(this.module, '_onUploadFail');
      this.module._onUploadDone({}, {result: undefined});

      assert.called(target);
    });
  }