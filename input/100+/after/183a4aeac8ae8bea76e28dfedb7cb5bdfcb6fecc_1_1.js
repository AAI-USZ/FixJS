function() {
	
//setup UI widgets

Mojo.Log.info("ID %j ", this.place.id);

//set localized text
$("DeatilsText").innerHTML = $L("Details");
$("SmallHint").innerHTML = $L("Tap and hold to rename");

//setup Call button
this.controller.setupWidget("CallButton",
  this.attributes = {
  },
  this.CallButtonModel = {
      label : "",
      disabled: false
  }
);

this.CallButtonEventHandler = this.CallButtonTap.bindAsEventListener(this);
this.CallButton = this.controller.get('CallButton');
Mojo.Event.listen(this.CallButton, Mojo.Event.tap, this.CallButtonEventHandler);

this.controller.setupWidget("name",
  this.attributes = {
      hintText: $L(""),
      multiline: false,
      enterSubmits: false,
      autoFocus: false,
      holdToEdit: true,
      focusMode: Mojo.Widget.focusSelectMode,
      focus: false
  },
  this.nameModel = {
      value: this.place.name,
      disabled: false
  }
); 

this.RenameEventHandler = this.RenameChange.bindAsEventListener(this);
this.Rename = this.controller.get('name');
Mojo.Event.listen(this.Rename, Mojo.Event.propertyChange, this.RenameEventHandler);

if(this.isTouchPad()){

  this.menuModel = {
  visible: true,
  items:  [
      {
          items: [
			  { iconPath: "images/menu-icon-favorites.png", command: "do-favorites"},
              { icon: "back", command: "goBack"},
          ]
      },
      {
          items: [
          ]
      },
      {
          items: [
          	  { icon: "send", command: "share"},
          ]
      }
  ]
};
} else {
	
  this.menuModel = {
  visible: true,
  items: [
      {
          items: [
             { iconPath: "images/menu-icon-favorites.png", command: "do-favorites"},
          ]
      },
      {
          items: [
          ]
      },
      {
          items: [
          	  { icon: "send", command: "share"},
          ]
      }
  ]
};

	
};
this.pop = [];
this.pop.action = null;
this.pop.id = null;

//changes the icon upon favorite or not
this.changeFavIcon(this.place.favorite);


this.controller.setupWidget(Mojo.Menu.commandMenu,
         this.attributes = {
             spacerHeight: 0,
             menuClass: 'no-fade'
         },
         this.menuModel
);

// Show everything available from place on this scene
if (this.place.icon) { $("place-icon").innerHTML = "<img width='48' height='48' src='" + this.place.icon + "'>";  };
//if (this.place.name) { $("name").innerHTML = this.place.name; };
if (this.place.formatted_address) { $("formatted_address").innerHTML = $L("Address") + ":<br>" + this.place.formatted_address; };
$("loc").innerHTML = $L("Loc") + ":<br>" + this.place.geometry.location.toUrlValue(8);
if (this.place.formatted_phone_number) {
	 $("CallButton").show();
	 $("CallButtonLabel").innerHTML = this.place.formatted_phone_number;
	  };
if (this.place.rating) {
	$("rating-container").show();
	$("rating").innerHTML = $L("Rating") + ":<br>" + this.place.rating;
	document.getElementById("ratingstar").style.width = this.place.rating*20 + "%";
	};
	
if (this.place.opening_hours != undefined) {
	var d = new Date();
	var n = d.getDay();
	Mojo.Log.info("Opening %j ", this.place.opening_hours.periods[n]);
	$("opening_hours").show();
	$("OpenhoursText").innerHTML = $L("Open hours:");
	$("OpenHoursIcon").innerHTML = (this.place.opening_hours.open_now ? '<img src="images/hours_open.png">' : '<img src="images/hours_closed.png">');
	$("TodayOpenText").innerHTML = $L("Today: ") + this.place.opening_hours.periods[n].open.time.insert(2, ":") + " - " + this.place.opening_hours.periods[n].close.time.insert(2, ":");
};
if (this.place.url) { $("url").innerHTML = "<a href='" + this.place.url + "'>" + $L("Show full Google page") + "</a>"; };
if (this.place.website) { $("website").innerHTML = $L("Home page") + ":<br>" + "<a href='" + this.place.website + "'>" + this.place.website + "</a>"; };

//User reviews
/* ToDo
if (this.place.reviews != undefined) {
	
};
*/
		
}