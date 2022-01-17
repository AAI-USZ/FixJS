function() {

	if(this.isTouchPad()){
		//this.restmenuwidth = 598; //workaround of Touchpad Orientation handle event BUG
		$("TPBackButton").show(); //zapnu vsude backbuttony
		$("TPBackButtonD").show();
		this.actualTPwidth = this.controller.window.innerWidth;
		//document.getElementById("MainSearchField").style.width= '60% !important;';
	};

/* Setup bottom command menu */
this.cmdMenuModel = {
  visible: true,
  items: [
      {
          items: [
          ]
      },
      {
          items: [
              //{label: $L('DEV'), command:'debug'},
              {label: $L('Minus'), iconPath:'images/zoomout.png', command:'zoomOut'},
              {label: $L(''), iconPath:'images/list-view-icon.png', command:'PopMenu'},
              {label: $L('Plus'), iconPath:'images/zoomin.png', command:'zoomIn'}
          ]
      },
      {
          items: [
          ]
      }
  ]
};

this.controller.setupWidget(Mojo.Menu.commandMenu, {menuClass:'bottom-menu'}, this.cmdMenuModel);

/* Setup application menu */
this.appMenuModel = {
  items: [
      {label: $L("About..."), command: 'do-about', shortcut: 'a'},
      {label: $L("License"), command: 'do-license', shortcut: 'l'}
  ]
};

this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: false }, this.appMenuModel);

/* Setup top menu */
this.feedMenuModel = {
  visible: true,
  items: [

  		{
          items: [
          ]
      },
  		{
      items: [
		  //{template:'main/top-bar-template'},
		  {},
          //{ icon: "search", command: 'searchPlaces', label: ""},
          //{template:'main/search', width: 200},
          { label: $L("Google Maps"), command: 'searchPlaces', width: this.restmenuwidth},
          //{ label: $L("Tap or type to search..."), command: 'searchPlaces', width: this.restmenuwidth},
          { iconPath: "images/layers.png", command: 'maptype', label: $L('M')},
          {label: $L('MyLoc'), iconPath:'images/menu-icon-mylocation.png', command:'MyLoc'}
      ]
      },
      {
          items: [
          ]
      }
  ]
 };

this.controller.setupWidget(Mojo.Menu.viewMenu,
  { spacerHeight: 0, menuClass:'no-fade' },
  this.feedMenuModel);

}