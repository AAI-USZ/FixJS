function() {
    builder.plugins.setInstallState(info.identifier, builder.plugins.TO_INSTALL);
    info.installState = builder.plugins.TO_INSTALL;
    builder.views.plugins.updatePluginEntry(info);
    builder.plugins.performDownload(info.identifier, info.repositoryInfo.browsers[bridge.browserType()].downloadUrl);
  }