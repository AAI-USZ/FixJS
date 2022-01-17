function(callback)
    {  
        WebInspector.cssModel.resourceBinding().setStyleContent(this, this.workingCopy(), true, callback);
    }