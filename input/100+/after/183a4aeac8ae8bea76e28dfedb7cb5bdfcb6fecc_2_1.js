function() {
	
//setup UI widgets


//set localized text
document.getElementById("TitleText").innerHTML = $L("Markers list");
document.getElementById("LabelMyLocText").innerHTML = $L("My Location");
document.getElementById("LabelNearbyText").innerHTML = $L("Nearby places");
document.getElementById("LabelPlacesText").innerHTML = $L("Places");
document.getElementById("SortedBy").innerHTML = $L("Relevance");

//setup NearbyDrawer collapsible
this.controller.setupWidget("NearbyDrawer",
  this.attributes = {
      modelProperty: 'open',
      unstyled: true
  },
  this.NearbyDrawerModel = {
      open: true
  }
); 

//setup Nearby places collapsible arrow listener
this.NearbyDrawerEventHandler = this.toggleNearbyDrawer.bindAsEventListener(this);
this.NearbyDrawer = this.controller.get('NearbyButArrow');
Mojo.Event.listen(this.NearbyDrawer, Mojo.Event.tap, this.NearbyDrawerEventHandler);

//setup NearbyDrawer collapsible
this.controller.setupWidget("MarkersDrawer",
  this.attributes = {
      modelProperty: 'open',
      unstyled: true
  },
  this.MarkersDrawerModel = {
      open: true
  }
); 

//setup Places collapsible arrow listener
this.MarkersDrawerEventHandler = this.toggleMarkersDrawer.bindAsEventListener(this);
this.MarkersDrawer = this.controller.get('MarkersButArrow');
Mojo.Event.listen(this.MarkersDrawer, Mojo.Event.tap, this.MarkersDrawerEventHandler);


//setup Nearby places list widget
this.controller.setupWidget("NearbyMarkersList",
	{
		itemTemplate: 'markers-list/listentry',
		swipeToDelete: false,
        reorderable: false
	},
       this.NearbyListModel = {
		items : [    
				]
  }
);

// setup NearbyMarkersList tap listener
this.NearbyMarkersListEventHandler = this.ListTap.bindAsEventListener(this);
this.NearbyMarkersList = this.controller.get('NearbyMarkersList');
Mojo.Event.listen(this.NearbyMarkersList, Mojo.Event.listTap, this.NearbyMarkersListEventHandler);

//setup Places list widget
this.controller.setupWidget("MarkersList",
	{
		itemTemplate: 'markers-list/listentry',
		swipeToDelete: false,
        reorderable: false
		//dividerFunction : this.whatPosition
	},
       this.MarkersListModel = {
		items : [    
				]
  }
);

//setup MarkersList tap listener
this.MarkersListEventHandler = this.ListTap.bindAsEventListener(this);
this.MarkersList = this.controller.get('MarkersList');
Mojo.Event.listen(this.MarkersList, Mojo.Event.listTap, this.MarkersListEventHandler);

//setup Favorites list widget
this.controller.setupWidget("FavoritesList",
	{
		itemTemplate: 'markers-list/listentry',
		swipeToDelete: true,
        reorderable: false
		//dividerFunction : this.whatPosition
	},
       this.FavoritesListModel = {
		items : [    
				]
  }
);

//setup MarkersList tap listener
this.FavoritesListEventHandler = this.ListTap.bindAsEventListener(this);
this.FavoritesList = this.controller.get('FavoritesList');
Mojo.Event.listen(this.FavoritesList, Mojo.Event.listTap, this.FavoritesListEventHandler);

//setup My Location list widget
this.controller.setupWidget("MyLocationList",
	{
		itemTemplate: 'markers-list/listentry',
		//listTemplate: 'home/listcontainer',
		//addItemLabel: 'Add New',
		swipeToDelete: false,
        reorderable: false
		//dividerFunction : this.whatPosition
	},
       this.MyLocationListModel = {
		items : [ 
				{name: $L("My Location"), address: $L("Unknown"), distance: $L("Loc: ") + this.Markers[2].place.geometry.location, place: this.Markers[2].place}
				]
  }
);

//setup MyLocation List tap listener
this.MyLocationListEventHandler = this.ListTap.bindAsEventListener(this);
this.MyLocationList = this.controller.get('MyLocationList');
Mojo.Event.listen(this.MyLocationList, Mojo.Event.listTap, this.MyLocationListEventHandler);


//Observe a Share button element in list
//this.ShareHandler = this.Share.bindAsEventListener(this);
//this.controller.get('ShareButton').observe(Mojo.Event.tap, this.ShareHandler);

//setup sort button listener

this.SortButtonEventHandler = this.SortButtonTap.bindAsEventListener(this);
this.SortButton = this.controller.get('SortButton');
Mojo.Event.listen(this.SortButton, Mojo.Event.tap, this.SortButtonEventHandler);

this.SortedBy = "sort-relevance"; //default sort after scene launch

//define variables
this.pop = [];
this.pop.action = null;


//Geocode My Location to address
this.GeocodeFromLatLng(this.Markers[2].place.geometry.location);	

//Action is passed argument from main assistant, what to do
this.Action = this.Markers.action;
Mojo.Log.info("** ACTION *** %j", this.Markers.action);	

//fill the lists
this.UpdateList();

//show containers, that contains markers
if (this.Markers[0][0]) { $('NearbyContainer').show(); $('SortByContainer').show(); };
if (this.Markers[1][0]) { $('PlacesContainer').show(); $('SortByContainer').show(); };
  
if(this.isTouchPad()){

		var menuModel = {
  visible: true,
  items: [
      {
          items: [
              { icon: "back", command: "goBack"},
          ]
      }
  ]
};
this.controller.setupWidget(Mojo.Menu.commandMenu,
         this.attributes = {
             spacerHeight: 0,
             menuClass: 'no-fade'
         },
         menuModel
	);

};

		
}