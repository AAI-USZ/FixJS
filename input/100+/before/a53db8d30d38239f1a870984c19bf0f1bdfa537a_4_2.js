function(){
			this._cm.a = this._m.a;
			this._cm.b = this._m.b;
			this._cm.c = this._m.c;
			this._cm.d = this._m.d;
			this._cm.tx = this._m.tx;
			this._cm.ty = this._m.ty;
			if(this.parent != null){
				return this._cm.prependMatrix(this.parent.concatedMatrix);
			}
			else
				return this._cm;
		}