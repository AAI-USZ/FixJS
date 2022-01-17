function re_createRecentEntry(recent) {
    var classes = 'icon ';
    var fontDateClasses = '';
    if (recent.type == 'incoming-refused') {
      classes += 'icon-missed';
      fontDateClasses = 'missed-call-font';
    } else if (recent.type.indexOf('dialing') != -1) {
      classes += 'icon-outgoing';
    } else if (recent.type.indexOf('incoming') != -1) {
      classes += 'icon-incoming';
    }

    var entry =
      '<li class="log-item ' + recent.type +
      '  " data-num="' + recent.number + '">' +
      '  <section class="icon-container grid center">' +
      '    <div class="grid-cell grid-v-align">' +
      '      <div class="' + classes + '"></div>' +
      '    </div>' +
      '  </section>' +
      '  <section class="log-item-info grid">' +
      '    <div class="grid-cell grid-v-align">' +
      '      <section class="primary-info ellipsis">' +
      recent.number +
      '      </section>' +
      '      <section class="' + fontDateClasses +
      '        secondary-info ellipsis">' + prettyDate(recent.date) +
      '      </section>' +
      '    </div>' +
      '  </section>' +
      '  <section class="call-log-contact-photo">' +
      '  </section>' +
      '</li>';
    return entry;
  }