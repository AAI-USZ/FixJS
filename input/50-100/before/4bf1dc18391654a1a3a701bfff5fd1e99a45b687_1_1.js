function()
{
  var brandbundle = document.getElementById("bundle_brand");
  if (nightly.variables.name==null)
  {
    nightly.variables.name=brandbundle.getString("brandShortName");
  }
  nightly.variables.defaulttitle=brandbundle.getString("brandShortName");
  nightly.variables.brandname=brandbundle.getString("brandFullName");
  
  var tabmail = document.getElementById("tabmail");
  if (tabmail && typeof(tabmail.setDocumentTitle) === "function")
  {
    nightlyApp.savedTabmailSetDocumentTitle=tabmail.setDocumentTitle;
  }
}