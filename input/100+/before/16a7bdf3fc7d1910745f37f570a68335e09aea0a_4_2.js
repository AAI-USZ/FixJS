function() {
  builder.dialogs.runall.currentScriptIndex++;
  if (builder.dialogs.runall.currentScriptIndex < builder.dialogs.runall.scriptNames.length &&
      !builder.dialogs.runall.requestStop)
  {
    jQuery("#script-num-" + builder.dialogs.runall.currentScriptIndex).css('background-color', '#ffffaa');
    builder.suite.switchToScript(builder.dialogs.runall.currentScriptIndex);
    builder.dialogs.runall.currentPlayback = builder.getScript().seleniumVersion.rcPlayback;
    builder.dialogs.runall.currentPlayback.run(
      builder.dialogs.runall.hostPort,
      builder.dialogs.runall.browserString,
      builder.dialogs.runall.processRCResult);
  } else {
    jQuery(builder.dialogs.runall.close_b).show();
    jQuery(builder.dialogs.runall.info_p).html("Done!");
    jQuery('#edit-suite-editing').show();
    jQuery('#edit-suite-stopping').hide();
    jQuery('#edit-suite-playing').hide();
  }
}