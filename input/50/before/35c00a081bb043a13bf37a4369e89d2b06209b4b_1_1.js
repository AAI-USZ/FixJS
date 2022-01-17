function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<h3>Options</h3><table><tbody><tr><td>Album name</td><td><input value="', soy.$$escapeHtml(opt_data.name), '" type="text" id="folderName-input" class="xlarge"/></td></tr><tbody></table><div class="row show-grid"><div class="span"><button class="btn" id="save-folder-btn">Save changes</button></div><div class="span"><button id="remove-folder-btn" class="btn btn-error">Remove album</button></div></div>');
  return opt_sb ? '' : output.toString();
}