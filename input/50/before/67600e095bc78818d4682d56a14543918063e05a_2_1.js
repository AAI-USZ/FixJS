function commitIncrementalEdit()
        {
            WebInspector.cssModel.resourceBinding().setStyleContent(this, this.workingCopy(), false, function() {});
        }