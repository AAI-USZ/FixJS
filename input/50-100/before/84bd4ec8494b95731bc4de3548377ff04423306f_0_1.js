function (m) { 
			var p = this._get_parent(m.o);
			if(!p) return false;
			p = p == -1 ? this.get_container() : p;
			if(p === m.np) return true;
			if(p[0] && m.np[0] && p[0] === m.np[0]) return true;
			return false;
			return true;
		    }