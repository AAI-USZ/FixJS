function() {
	
//setup UI widgets

//set localized text
$("DeatilsText").innerHTML = $L("Details");

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
	

if(this.isTouchPad()){

  var menuModel = {
  visible: true,
  items:  [
      {
          items: [
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
	
  var menuModel = {
  visible: true,
  items: [
      {
          items: [
             
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
this.controller.setupWidget(Mojo.Menu.commandMenu,
         this.attributes = {
             spacerHeight: 0,
             menuClass: 'no-fade'
         },
         menuModel
	);

// Show everything available from place on this scene
if (this.place.icon) { $("place-icon").innerHTML = "<img width='48' height='48' src='" + this.place.icon + "'>";  };
if (this.place.name) { $("name").innerHTML = this.place.name; };
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
if (this.place.url) { $("url").innerHTML = "<a href='" + this.place.url + "'>" + $L("Show full Google page") + "</a>"; };
if (this.place.website) { $("website").innerHTML = $L("Home page") + ":<br>" + "<a href='" + this.place.website + "'>" + this.place.website + "</a>"; };




		
}