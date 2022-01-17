function() {
    	this.permissions = new PermissionList();
    	this.permissions.bind('reset', this.addAll, this);
    }