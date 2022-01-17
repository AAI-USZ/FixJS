function(args) {

		if(this._data.length !== 2){

			return;

		}



		var dataList = this._data[0];

		var comboBox = this._data[1];

		

		if(!this._context.loadRequires(dataList.type,true) ||

			!this._context.loadRequires(comboBox.type,true)){

			return;

		}

	

		var dataListId = Widget.getUniqueObjectId(dataList.type, this._context.getDocument());

		if(!dataList.properties){

			dataList.properties = {};

		}

		dataList.properties.id = dataListId;

		dataList.properties['data-dojo-props'] = 'id:"'+dataListId+'"';

		dataList.context = this._context;

		

		if(!comboBox.properties){

			comboBox.properties = { };

		}

		comboBox.context = this._context;

		comboBox.properties['data-dojo-props'] = 'value:"Item 1", list:"'+dataListId+'"';



		var dataListWidget,

			comboBoxWidget;

		

		//var dj = this._context.getDojo();

		dojo.withDoc(this._context.getDocument(), function(){

			dataListWidget = Widget.createWidget(dataList);

			comboBoxWidget = Widget.createWidget(comboBox);

		});

		

		if(!dataListWidget || !comboBoxWidget){

			console.error(this.declaredClass + 'Error creating widgets');

			return;

		}

		comboBoxWidget.dijitWidget.store = dataListWidget.dijitWidget;

		

		var command = new CompoundCommand();

		var index = args.index;

		//var store = comboBoxWidget.dijitWidget.store;

		// always put datalists as first element under body, to ensure they are constructed by dojo before they are used

		var bodyWidget = Widget.getWidget(this._context.rootNode);

		command.add(new AddCommand( dataListWidget, bodyWidget , 0 ));

		index = (index !== undefined && index >= 0 ? index + 1 : undefined);

		command.add(new AddCommand(comboBoxWidget, args.parent, index));

		

		if(args.position){

			var absoluteWidgetsZindex = this._context.getPreference('absoluteWidgetsZindex');

			command.add(new StyleCommand(comboBoxWidget, [{position:'absolute'},{'z-index':absoluteWidgetsZindex}]));

			command.add(new MoveCommand(comboBoxWidget, args.position.x, args.position.y));

		}

		args.size = this._getInititalSize(comboBoxWidget, args);

		if(args.size){

			command.add(new ResizeCommand(comboBoxWidget, args.size.w, args.size.h));

		}

		

		this._mobileWidget = comboBoxWidget;

		return command;

	}