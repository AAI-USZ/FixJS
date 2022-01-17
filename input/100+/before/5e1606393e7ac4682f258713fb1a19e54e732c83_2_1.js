function(){
		var objsRectagles,indexesOfNew;
		this.objOnMoveDictionary = MultiDrag.util.dictionFactory();
		this.innerObjs = this.objs.filter(function(obj){
			var el = obj.el.parentNode;
			while( el ){
				if(el === this.el ){
					return true;
				}
				el = el.parentNode;
			}
			return false;
		},this);
		indexesOfNew = MultiDrag.util.range(this.innerObjs.length);
		objsRectagles = this.options.positioning(this.innerObjs.map(function(obj){
			return obj.getRectangle();
		}),indexesOfNew);
		this.setPosition(objsRectagles,indexesOfNew);
		this.innerObjs.forEach(function(obj){
			this.onAdd(obj);
		},this);
	}