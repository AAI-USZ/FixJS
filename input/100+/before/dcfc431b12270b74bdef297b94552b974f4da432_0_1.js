function(/* array */arr){
		//	summary
		//	return an object of type dojox.collections.Iterator
		var a=arr;
		var position=0;
		this.element=a[position]||null;
		this.atEnd=function(){
			//	summary
			//	Test to see if the internal cursor has reached the end of the internal collection.
			return (position>=a.length);	//	bool
		};
		this.get=function(){
			//	summary
			//	Get the next member in the collection.
			if(this.atEnd()){
				return null;		//	object
			}
			this.element=a[position++];
			return this.element;	//	object
		};
		this.map=function(/* function */fn, /* object? */scope){
			//	summary
			//	Functional iteration with optional scope.
			return arr.map(a, fn, scope);
		};
		this.reset=function(){
			//	summary
			//	reset the internal cursor.
			position=0;
			this.element=a[position];
		};
	}