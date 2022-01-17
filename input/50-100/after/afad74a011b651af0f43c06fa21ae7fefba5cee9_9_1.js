function() {
    	this.permissions = new PermissionList();
    	this.permissions.bind('reset', this.addAll, this);
    	
    	//
    	this.profilePermissions = new PermissionList();
    	this.profilePermissions.url = this.profilePermissions.url+"UserProfile/"+getViewer().get("id");
    	//
    	this.profilePermissions.bind('add',   this.addOneProfilePermission, this);
        this.profilePermissions.bind('reset', this.addAllProfilePermissions, this);
    }