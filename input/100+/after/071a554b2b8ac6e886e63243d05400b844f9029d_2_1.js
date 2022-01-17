function(/*Object*/ args){
			// summary:
			//		Instantiates a new data model that view components may bind to.
			//		This is a private constructor, use the factory method
			//		instead: dojox/mvc/newStatefulModel(args)
			// args:
			//		The mixin properties.
			// description:
			//		Creates a tree of dojo/Stateful objects matching the initial
			//		data structure passed as input. The mixin property "data" is
			//		used to provide a plain JavaScript object directly representing
			//		the data structure.
			// tags:
			//		private
			var data = (args && "data" in args) ? args.data : this.data;

			if(data != null){
				data = getStateful(data, StatefulModel.getStatefulOptions);
				if(lang.isArray(data)){
					// Some consumers of dojox/mvc/StatefulModel inherits it via dojo/declare(), where we cannot use array inheritance technique
					// (dojo/declare() does not support return value in constructor)
					this.length = 0;
					[].splice.apply(this, data);
				}else if(lang.isObject(data)){
					for(var s in data){
						if(data.hasOwnProperty(s)){
							this[s] = data[s];
						}
					}
				}else{
					this.set("value", data);
				}
			}
		}