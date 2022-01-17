function re_createRecentEntry(recent) {
    var classes = 'icon ';
    if (recent.type.indexOf('dialing') != -1) {
      classes += 'icon-outgoing';
    } else if (recent.type.indexOf('incoming') != -1) {
      classes += 'icon-incoming';
    } else {
      classes += 'icon-missed';
    }

    var entry =
      '<li class="log-item" data-num="' + recent.number + '">' +
      '  <section class="icon-container grid center">' +
      '    <div class="grid-cell grid-v-align">' +
      '      <div class="icon ' + classes + '"></div>' +
      '    </div>' +
      '  </section>' +
      '  <section class="log-item-info grid">' +
      '    <div class="grid-cell grid-v-align">' +
      '      <section class="primary-info ellipsis">' +
      recent.number +
      '      </section>' +
      '      <section class="secondary-info ellipsis">' +
      prettyDate(recent.date) +
      '      </section>' +
      '    </div>' +
      '  </section>' +
      '  <section class="call-log-contact-photo">' +
      '  </section>' +
      '</li>';
    return entry;
  }