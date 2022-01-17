function create_status_window() {
    var status_window = $('acts_as_monitor_status_window');
    Position.absolutize(status_window);
    status_window.observe('click', function(ev) {status_window.fade(); });
    status_window.hide();
    //The helper provide the Rails.root inside the created div...
    application_root = status_window.innerHTML;
  }