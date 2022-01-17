function(folder) {
  // load any partials that could be used by the filters
  var partialDirectory = utils.fileJoin(folder, '_partials');
  if(fs.existsSync(partialDirectory)) {
    partials = loadPartials(partialDirectory);
  }

  // add fmj specific filters to imbue  
  imbue.addFilters(fmjFilters);

  // add site specific filters
  var siteFiltersFile = utils.fileJoin(process.cwd(), folder, '_filters.js');
  var specific;
  if(fs.existsSync(siteFiltersFile)) {
    specific = require(siteFiltersFile);
    imbue.addFilters(specific);
  }
}