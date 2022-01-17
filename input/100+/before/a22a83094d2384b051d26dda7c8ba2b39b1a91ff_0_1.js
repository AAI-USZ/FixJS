function (){
			this.__list			= '__' + this.elList;
			this.__item			= '__' + this.elItem;
			this.__input		= '__' + this.elInput;
			this.__highlight	= '__' + this.elHighlight;

			var span = document.createElement('span');
			span.className = this._highlightClassName = this.s(this.__highlight, 1);
			this._highlightNode	= span;
		}