function(icon){
			this._set("closeIcon", icon);
			this.closeIconNode = iconUtils.setIcon(icon, this.iconPos, this.closeIconNode, null, this.closeHeaderNode);
		}