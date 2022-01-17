function addNewestVersionLink(inst, data) {
  if (data.project_url_for_newest_version) {
    var nvl = $(inst).find(".newest-version-link");
    $(nvl).html(externalLink("Newest Release", data.project_url_for_newest_version, "newest-version"));
  }
}