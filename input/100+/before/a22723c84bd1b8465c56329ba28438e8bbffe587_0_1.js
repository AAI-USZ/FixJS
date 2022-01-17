function(evt){
		this._elem.createDnDNodes(this._dndRegion);
		var m = dojo.dnd.manager();
		var oldMakeAvatar = m.makeAvatar;
		m._dndPlugin = this;
		m.makeAvatar = function(){
			var avatar = new GridDnDAvatar(m);
			delete m._dndPlugin;
			return avatar;
		};
		m.startDrag(this._source, this._elem.getDnDNodes(), evt.ctrlKey);
		m.makeAvatar = oldMakeAvatar;
		m.onMouseMove(evt);
	}