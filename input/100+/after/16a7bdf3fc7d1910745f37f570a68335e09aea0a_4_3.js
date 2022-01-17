function() {
  builder.dialogs.runall.currentScriptIndex++;
  if (builder.dialogs.runall.currentScriptIndex < builder.dialogs.runall.scriptNames.length &&
      !builder.dialogs.runall.requestStop)
  {
    jQuery("#script-num-" + builder.dialogs.runall.currentScriptIndex).css('background-color', '#ffffaa');
    builder.suite.switchToScript(builder.dialogs.runall.currentScriptIndex);
    builder.stepdisplay.update();
    builder.dialogs.runall.currentPlayback = builder.getScript().seleniumVersion.playback;
    builder.dialogs.runall.currentPlayback.runTest(builder.dialogs.runall.processLocalResult);
  } else {
    jQuery('#suite-playback-stop').hide();
    jQuery('#suite-playback-close').show();
    jQuery(builder.dialogs.runall.info_p).html("Done!");
    jQuery('#edit-suite-editing').show();
  }
}