function re_createRecentEntry(recent) {
    var classes = 'icon ';
    var fontDateClasses = '';
    if (recent.type.indexOf('dialing') != -1) {
      classes += 'icon-outgoing';
    } else if (recent.type.indexOf('incoming') != -1) {
      if (recent.type.indexOf('connected') == -1) {
        classes += 'icon-missed';
        fontDateClasses = 'missed-call-font';
      } else {
        classes += 'icon-incoming';
      }
    }

    var entry =
      '<li class="log-item ' +
      ((localStorage.getItem('latestCallLogVisit') < recent.date) ?
        'highlighted' : '') +
      '  " data-num="' + recent.number +
      '  " data-date="' + recent.date +
      '  " data-type="' + recent.type + '">' +
      '  <section class="icon-container grid center">' +
      '    <div class="grid-cell grid-v-align">' +
      '      <div class="call-type-icon ' + classes + '"></div>' +
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