function (){
			this.__list			= '__' + this.elList;
			this.__item			= '__' + this.elItem;
			this.__input		= '__' + this.elInput;
			this.__highlight	= '__' + this.elHighlight;
			this._itemFiltered	= this.__list +'_'+ this.modItemFiltered;

			this._itemFilteredClassName	= this.s(this._itemFiltered, 1);

			var span = document.createElement('span');
			span.className = this.__highlightClassName = this.s(this.__highlight, 1);
			this._highlightNode	= span;
		}