function() {
  beforeEach(function() {
    this.dispatcher = _.clone(Backbone.Events);
    this.view = new storybase.builder.views.BuilderView({
      dispatcher: this.dispatcher
    });
  });

  describe('when receiving the "error" event', function() {
    beforeEach(function() {
      // Binding event handlers to the dispatcher happens in the view's
      // initialize method, so we have to spy on the prototype so the
      // spied method will get bound.
      spyOn(storybase.builder.views.BuilderView.prototype, 'error');
      this.view = new storybase.builder.views.BuilderView({
        dispatcher: this.dispatcher
      });
    });

    it('calls the error method', function() {
      var errMsg = 'An error message';
      this.dispatcher.trigger('error', errMsg);
      expect(this.view.error).toHaveBeenCalledWith(errMsg);
    });
  });
}