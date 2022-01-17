function(){
  // TODO: templates
  var view = this.view
    , showError = this._showError
    , showProgress = this._showProgress;

  // type
  view.type(this.type);

  // errors
  if (showError && this.error) {
    view.errorMessage(this.error.split('\n')[0]);
  } else {
    view.errorMessage().remove();
  }

  // attempts
  if (this.attempts.made) {
    view.attempts(this.attempts.made + '/' + this.attempts.max);
  } else {
    view.attempts().parent().remove();
  }

  // restarts
  if (this.restarts.made) {
    view.restarts(this.restarts.made + '/' + this.restarts.max);
  } else {
    view.restarts().parent().remove();
  }

  // precursors
  if (this.precursors) {
	    view.precursors(this.precursors);
	  } else {
	    view.precursors().parent().remove();
	  }

  if (this.after) {
    view.after(this.after);
  } else {
    view.after().parent().remove();
  }

  // title
  view.title(this.data.title
    ? this.data.title
    : 'untitled');

  // details
  this.renderTimestamp('created_at');
  this.renderTimestamp('updated_at');
  this.renderTimestamp('failed_at');

  // delayed
  if ('delayed' == this.state) {
    var delay = parseInt(this.delay, 10)
      , creation = parseInt(this.created_at, 10)
      , remaining = relative(creation + delay - Date.now());
    view.title((this.data.title || '') + ' <em>( ' + remaining + ' )</em>');
  }

  // inactive
  if ('inactive' == this.state) view.log.remove();

  // completion
  if ('complete' == this.state) {
    view.duration(relative(this.duration));
    view.updated_at().prev().text('Completed: ');
    view.priority().parent().hide();
  } else {
    view.duration().parent().remove();
  }

  // error
  if ('failed' == this.state) {
    view.error().show().find('pre').text(this.error);
  } else {
    view.error().hide();
  }

  // progress indicator
  if (showProgress) this._progress.update(this.progress).draw(this.ctx);

  // logs
  if (this.showDetails) {
    request('GET', './job/' + this.id + '/log', function(log){
      var ul = view.log.show();
      ul.find('li').remove();
      log.forEach(function(line){
        ul.append(o('<li>%s</li>', line));
      });
    });
  }
}