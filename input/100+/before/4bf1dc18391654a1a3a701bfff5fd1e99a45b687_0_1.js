function()
{
  var brandbundle = document.getElementById("bundle_brand");
  if (nightly.variables.name==null)
  {
    nightly.variables.name=brandbundle.getString("brandShortName");
  }
  nightly.variables.brandname=brandbundle.getString("brandFullName");
  nightly.variables.defaulttitle=nightlyApp.storedTitle;

  var tabbrowser = document.getElementById("content");
  nightlyApp.oldUpdateTitlebar = tabbrowser.updateTitlebar;

  tabbrowser.updateTitlebar = nightly.updateTitlebar;
  tabbrowser.addEventListener("DOMTitleChanged", nightly.updateTitlebar, false);
}