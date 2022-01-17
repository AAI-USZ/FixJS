function (node, playall, altCallback, altOKText) {
  builder.dialogs.rc.node = node;
  builder.dialogs.rc.playall = playall;
  
  builder.dialogs.rc.dialog = newNode('div', {'class': 'dialog'});
  
  var run_b = newNode('a', altOKText || 'Run', {
    'class': 'button',
    'click': function () {
      var hostPort = jQuery('#rc-hostport').val();
      var browserString = jQuery('#rc-browserstring').val();
      window.bridge.setRcHostPort(hostPort);
      window.bridge.setRcBrowserString(browserString);
      builder.dialogs.rc.hide();
      if (altCallback) {
        altCallback(hostPort, browserString);
      } else {
        if (playall) {
          builder.dialogs.runall.runRC(node, hostPort, browserString);
        } else {
          builder.getScript().seleniumVersion.rcPlayback.run(hostPort, browserString);
        }
      }
    },
    'href': '#run'
  });
  var cancel_b = newNode('a', 'Cancel', {
    'class': 'button',
    'click': function () {
      builder.dialogs.rc.hide();
    },
    'href': '#cancel'
  });
  var bDiv = newNode('div', {style:'margin-top: 20px;'});
  jQuery(bDiv).append(run_b).append(cancel_b);
  var chooseHeader = newNode('h4', 'Selenium RC Settings');
  
  var optDiv = newNode('div', {id: 'options-div'},
    newNode('table', {style: 'border: none;', id: 'rc-options-table'},
      newNode('tr',
        newNode('td', "Host:Port of RC Server "),
        newNode('td', newNode('input', {id: 'rc-hostport', type: 'text', value: window.bridge.rcHostPort()}))
      ),
      newNode('tr',
        newNode('td', "Browser String "),
        newNode('td', newNode('input', {id: 'rc-browserstring', type: 'text', value: window.bridge.rcBrowserString()}))
      )
    )
  );
  
  jQuery(builder.dialogs.rc.dialog).
      append(chooseHeader).
      append(optDiv).
      append(bDiv);
      
  jQuery(node).append(builder.dialogs.rc.dialog);
}