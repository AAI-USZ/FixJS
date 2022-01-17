function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t\t<div><h3>Security</h3></div><div><br><div><button class="btn" id="manageGroups-btn">Manage groups</button></button></div><br><h3>>Profile permissions></h3><p>Remember, the profile inherits the main album permissions. Here are only shown the explicit permissions of the profile</p><table class="table table-striped table-bordered table-condensed"><thead><tr><th></th><th>Entity</th><th>Read Granted</th><th>Read Denied</th><th>Write Granted</th><th>Write Denied</th><th></th><th></th></tr></thead><tbody id="permissionsBody"><tr><td></td><td>New permission for<br><input placeholder="Group or person name" id="newPermissionEntity" type="text" class="span"></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><h3>All permissions list</h3><table  align="center" class="table table-striped table-bordered table-condensed"><thead><tr><th>Identity type</th><th>Identity name</th><th>Protected object type</th><th>Protected object id</th><th>Read Granted</th><th>Read Denied</th><th>Write Granted</th><th>Write Denied</th></tr></thead><tbody id="permissionTable"></tbody></table></div>');
  return opt_sb ? '' : output.toString();
}