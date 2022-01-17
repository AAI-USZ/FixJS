function addInstalledVersionLink(dir, data) {
  if (data.project_url_for_installed_version) {
    var ivl = $(dir).find(".installed-version-link");
    $(ivl).html(renderExternalLink("Installed Release", data.project_url_for_installed_version, "installed-version"));
  }
}