function(/*dojox/mvc/EditStoreRefListController*/ datamodel){
		// summary:
		//		create the WidgetList programatically if it has not been created, and 
		//		set the children for items_list widget to the datamodel to show the items in the selected list.
		//		RoundRectWidListTemplate is used for the templateString of the WidgetList.
		//
		// datamodel: dojox/mvc/EditStoreRefListController
		//		The EditStoreRefListController whose model holds the items for the selected list.
		//
		if(!roundRectWidList) {
			var clz = declare([WidgetList, RoundRectList], {});
			roundRectWidList = new clz({
				children: at(datamodel, "model"),
				childClz: declare([Templated /* dojox/mvc/Templated module return value */, ListItem /* dojox/mobile/ListItem module return value */]),
				childParams: {
					transitionOptions: {title: "Detail",target: "details,EditTodoItem",url: "#details,EditTodoItem"},
					clickable: true,
					onClick: function(){showItemDetails(this.indexAtStartup);}
				},
				childBindings: {
					titleNode: {value: at("rel:", "title")},
					checkedNode: {checked: at("rel:", "completed")}
				},
				templateString: RoundRectWidListTemplate
			});
			roundRectWidList.placeAt(dom.byId("list_container"));
			roundRectWidList.startup();
		}else{
			roundRectWidList.set("children", at(datamodel, 'model'));
		}
	}