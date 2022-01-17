function(args){

		if(this._data.length !== 2){

			return;

		}

		var controllerData = this._data[0];

		var containerData = this._data[1];

		if (!this._loadType(controllerData) || !this._loadType(containerData)) {

			return;

		}



		var containerId = Widget.getUniqueObjectId(containerData.type, this._context.getDocument());

		if(controllerData.properties){

			controllerData.properties.containerId = containerId;

		}else{

			controllerData.properties = {containerId: containerId};

		}

		if(containerData.properties){

			containerData.properties.id = containerId;

		}else{

			containerData.properties = {id: containerId};

		}

		containerData.context = this._context;

		controllerData.context = this._context;



		var controller,

			container;

		dojo.withDoc(this._context.getDocument(), function(){

			container = Widget.createWidget(containerData);

			controller = Widget.createWidget(controllerData);

		});

		if(!controller || !container){

			return;

		}



		var command = new CompoundCommand();

		command.add(new AddCommand(controller, args.parent, args.index));

		var index = (args.index !== undefined && args.index >= 0 ? args.index + 1 : undefined);

		command.add(new AddCommand(container, args.parent, index));

		if(args.position){

			command.add(new MoveCommand(controller, args.position.x, args.position.y - 30));

			command.add(new MoveCommand(container, args.position.x, args.position.y));

		}

		args.size = this._getInitialSize(container, args);

		if(args.size){

			command.add(new ResizeCommand(container, args.size.w, args.size.h));

		}

		this._container = container;

        return command;

	}