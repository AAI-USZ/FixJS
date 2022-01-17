function(args) {

		if(this._data.length !== 2){

			return;

		}

		

		var storeData = this._data[0],

			edge2EdgeData = this._data[1];

		

		if(!this._context.loadRequires(storeData.type,true) ||

			!this._context.loadRequires(edge2EdgeData.type,true)){

			return;

		}

		// Get handle to refChild (child before which to insert new widget

		// because logic below might cause args.index to be incorrect

		var children = args.parent ? args.parent.getChildren() : [];

		var refChild = (typeof args.index == 'number' && children[args.index]) ? children[args.index] : null;

	

		var storeId = Widget.getUniqueObjectId(storeData.type, this._context.getDocument());

		if(!storeData.properties){

			storeData.properties = {};

		}

		storeData.properties.jsId = storeId;

		storeData.properties.id = storeId;

		storeData.context = this._context;



		if (storeData.properties.data) { // might be url

			var data = storeData.properties.data;

			var items = data.items;

			

			// Kludge to workaround lack of support for frames in dojo's ItemFileReadStore

			// Replaces objects and arrays in metadata that were created with the top context with ones created in the frame context

			var copyUsingFrameObject = dojo.hitch(this, function (items) {

				var win = this._context.getGlobal();

				var copyOfItems = win.eval("[]");

				for (var i = 0; i < items.length; i++) {

					var item = items[i];

					var object = win.eval("new Object()");

					var copy = this._context.getDojo().mixin(object, item);

					copyOfItems.push(copy);

					if (copy.children) {

						copy.children = copyUsingFrameObject(copy.children);

					}

				}

				return copyOfItems;

			});

			data.items = copyUsingFrameObject(items);

		}



		var edge2EdgeDataId = Widget.getUniqueObjectId(edge2EdgeData.type, this._context.getDocument());

		if(!edge2EdgeData.properties){

			edge2EdgeData.properties = { };

		}

		edge2EdgeData.context = this._context;

	

		var store,

			edge2Edge;

		

		var dj = this._context.getDojo();

		dojo.withDoc(this._context.getDocument(), function(){

			store = Widget.createWidget(storeData);

			edge2EdgeData.properties.store = dj.getObject(storeId);

			edge2Edge = Widget.createWidget(edge2EdgeData);

		});

		

		if(!store || !edge2Edge){

			return;

		}

	

		var command = new CompoundCommand();

		// always put store and model as first element under body, to ensure they are constructed by dojo before they are used

		var bodyWidget = Widget.getWidget(this._context.rootNode);

		command.add(new AddCommand(store, bodyWidget, 0));

		var index = children.indexOf(refChild);

		if(index === -1){

			index = undefined;

		}

		command.add(new AddCommand(edge2Edge, args.parent, index));

		

		if(args.position){

			var absoluteWidgetsZindex = this._context.getPreference('absoluteWidgetsZindex');

			command.add(new StyleCommand(edge2Edge, [{position:'absolute'},{'z-index':absoluteWidgetsZindex}]));

			command.add(new MoveCommand(edge2Edge, args.position.x, args.position.y));

		}

		

		// Call superclass to potentially invoke widget initialSize helper if this is widget's initial creation time

		// (i.e., initialCreationArgs is provided)

		args.size = this._getInititalSize(edge2Edge, args);

		if(args.size){

			command.add(new ResizeCommand(edge2Edge, args.size.w, args.size.h));

		}

		

		this._mobileWidget = edge2Edge;

		return command;

	}