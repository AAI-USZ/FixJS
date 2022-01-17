function() {
      var changeHandler,
        _this = this;
      this.getOutput().applyStyles({
        'min-height': '400px'
      });
      this.$('.toolbar-container').css('padding-right', '12px');
      this.$('.luca-ui-toolbar.toolbar-bottom').css('margin', '0px');
      changeHandler = _.idleMedium(function() {
        if (_this.autoEvaluateCode === true) return _this.applyTestRun();
      }, 500);
      return this.getEditor().bind("code:change", changeHandler);
    }