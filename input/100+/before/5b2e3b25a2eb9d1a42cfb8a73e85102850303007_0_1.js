function(args){

		if(this._data.length !== 3){

			return;

		}

		

		var storeData = this._data[0];

		var modelData = this._data[1];

		var treeData = this._data[2];

		

		if(!this._context.loadRequires(storeData.type,true) || 

			!this._context.loadRequires(modelData.type,true) ||

			!this._context.loadRequires(treeData.type,true) || 

			!this._context.loadRequires("html.script",true)) { //We're using html.script in our declarative HTML

			return;

		}



		var storeId = Widget.getUniqueObjectId(storeData.type, this._context.getDocument());

		if(!storeData.properties){

			storeData.properties = {};

		}

		storeData.properties.jsId = storeId;

		storeData.properties.id = storeId;

		storeData.context = this._context;

		

		var modelId = Widget.getUniqueObjectId(modelData.type, this._context.getDocument());

		if(!modelData.properties){

			modelData.properties = {};

		}

		modelData.properties.jsId = modelId;

		modelData.properties.id = modelId;

		modelData.context = this._context;

		

		if(!treeData.properties){

			treeData.properties = { };

		}

		treeData.context = this._context;



		var store,

			model,

			tree;

		

		var dj = this._context.getDojo();

		dojo.withDoc(this._context.getDocument(), function(){

			//Set-up store

			this._treeHelper._addStoreScriptBlocks(storeData);

			store = Widget.createWidget(storeData);

			

			//Set-up model

			modelData.properties.store = dj.getObject(storeId);

			this._treeHelper._addStoreFunctions(modelData.properties.store);

			this._treeHelper._addModelScriptBlocks(modelData);

			model = Widget.createWidget(modelData);

			

			//Set-up tree

			treeData.properties.model = dj.getObject(modelId);

			this._treeHelper._addModelFunctions(treeData.properties.model);

			tree = Widget.createWidget(treeData);

		}.bind(this));

		

		if(!store || !model || !tree){

			return;

		}



		var command = new CompoundCommand();

		var index = args.index;

		// always put store and model as first element under body, to ensure they are constructed by dojo before they are used

       // var bodyWidget = Widget.getWidget(this._context.rootNode);

		command.add(new AddCommand(store, args.parent, index));

		index = (index !== undefined && index >= 0 ? index + 1 : undefined);

		command.add(new AddCommand(model, args.parent, index));

		index = (index !== undefined && index >= 0 ? index + 1 : undefined);

		command.add(new AddCommand(tree, args.parent, index));

		

		if(args.position){

			var absoluteWidgetsZindex = this._context.getPreference('absoluteWidgetsZindex');

			command.add(new StyleCommand(tree, [{position:'absolute'},{'z-index':absoluteWidgetsZindex}]));

			command.add(new MoveCommand(tree, args.position.x, args.position.y));

		}

		args.size = this._getInititalSize(tree, args);

		if(args.size){

			command.add(new ResizeCommand(tree, args.size.w, args.size.h));

		}

		

		this._tree = tree;

		return command;

	}