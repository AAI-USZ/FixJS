function loadTabCounts() {
    var tabs = [];
    $('.tab_counts a:not(.active)').each(function() {
      if (this.id) {
        tabs.push(this.id);
        // Add a spinner
        $(this).append('<span class="updating"></span>');
      }
    });
    if (tabs.length > 0) {
      var base = FACILITY_PATH;
      var active_tab = $('#main_navigation .active').attr('id')
      if (active_tab.indexOf('reservations') > -1) {
        base += '/reservations/';
      } else if (active_tab.indexOf('orders') > -1) {
        base += '/orders/';
      }
      console.debug("BASE", base);
      $.ajax({
        url: base + 'tab_counts',
        dataType: 'json',
        data: { tabs: tabs },
        success: function(data, textStatus, xhr) {
          for (i in tabs) {
            $('.tab_counts').find('a#' + tabs[i] + ' .updating').text("(" + data[tabs[i]] + ")").removeClass('updating').addClass('updated');
          }
        }
      });
    }
  }