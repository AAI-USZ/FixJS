function() {
  jQuery('#edit-suite-editing').hide();
  jQuery('#edit-suite-stopping').hide();
  jQuery('#edit-suite-playing').show();
  builder.dialogs.runall.requestStop = false;
  
  builder.dialogs.runall.scriptNames = builder.suite.getScriptNames();
  
  builder.dialogs.runall.info_p = newNode('p', {id:'infop'}, "Running scripts...");
  
  // Display the scripts in a similar fashion to the steps are shown in the record interface.
  builder.dialogs.runall.scriptlist = newFragment();
  
  for (var i = 0; i < builder.dialogs.runall.scriptNames.length; i++) {
    var name = builder.dialogs.runall.scriptNames[i];
    var sid = 'script-num-' + i;

    builder.dialogs.runall.scriptlist.appendChild(
      newNode('div', {id: sid, class: 'b-suite-playback-script'},
        newNode('div',
          newNode('span', {}, name),
          newNode('a', {class:"step-view", id:sid + "-view", style:"display: none", click: function(e) {
            window.bridge.getRecordingWindow().location = this.href;
            // We don't actually want the SB window to navigate to the script's page!
            e.preventDefault();
          }}, 'View Result')
        ),
        newNode('div', {class:"step-error", id:sid + "-error", style:"display: none"})
      )
    );
  }
  
  builder.dialogs.runall.close_b = newNode('a', 'Close', {
    class: 'button',
    style: 'display: none',
    click: function () {
      jQuery(builder.dialogs.runall.dialog).remove();
    },
    href: '#close'
  });
  
  builder.dialogs.runall.dialog = newNode('div', {class: 'dialog'});
  jQuery(builder.dialogs.runall.dialog)
    .append(builder.dialogs.runall.info_p)
    .append(builder.dialogs.runall.scriptlist)
    .append(newNode('p', builder.dialogs.runall.close_b));
    
  jQuery(builder.dialogs.runall.node).append(builder.dialogs.runall.dialog);
  
  builder.dialogs.runall.currentScriptIndex = -1; // Will get incremented to 0 in runNextRC/Local.
  if (builder.dialogs.runall.rc) {
    builder.dialogs.runall.runNextRC();
  } else {
    builder.dialogs.runall.runNextLocal();
  }
}