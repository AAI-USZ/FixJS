function ($, App) {

  App.provide('Views.Timeslice.Form', App.Views.Core.Form.extend({
    ui: {
      aliasModified: false
    },
    events: {
      'click .save': 'save',
      'click .close': 'close',
      'click .cancel': 'close',
      'click .calculate': 'calculation',
      'blur #timeslice-startedAt-date': 'copyDate'
    },
    startedAtValue: function() {
      var date = $('#timeslice-startedAt-date').val(),
          time = $('#timeslice-startedAt-time').val();

      return moment(date + ' ' + time, 'YYYY-MM-DD HH:mm:ss');
    },
    stoppedAtValue: function() {
      var date = $('#timeslice-stoppedAt-date').val(),
          time = $('#timeslice-stoppedAt-time').val();

      return moment(date + ' ' + time, 'YYYY-MM-DD HH:mm:ss');
    },
    copyDate: function() {
      $('#timeslice-stoppedAt-date').val($('#timeslice-startedAt-date').val());
    },
    calculation: function(e) {
      e.preventDefault();

      var start = this.startedAtValue(),
          stop = this.stoppedAtValue(),
          duration = stop.diff(start, 'seconds');

      $('#timeslice-formatDuration').val(App.Helper.Format.Duration(duration));
    }
  }));

}