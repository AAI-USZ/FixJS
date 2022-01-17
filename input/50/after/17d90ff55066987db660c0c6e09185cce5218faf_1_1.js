function(id) {
  builder.plugins.downloadingCount--;
  if (builder.plugins.downloadingCount == 0) {
    jQuery('#plugins-downloading').hide();
  }
  builder.views.plugins.refresh();
}