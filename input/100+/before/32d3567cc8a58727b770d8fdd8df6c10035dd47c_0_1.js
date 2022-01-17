function (id,title,menu) {
/*  initialize a BaseFrame on the element with the given ID
    if the element doesn't exist it will be created as a popup
    any existing HTML under the element will be deleted
    if a menu is provided, then it will be built into the frame
 */
    this.id = id;
    this.title = title;
    this.menu = menu;

    if (this.id) {
        this.elm = jQuery("#"+this.id);
    }
    else {
        if (openmdao.uniqueID) {
            openmdao.uniqueID = openmdao.uniqueID + 1;
        }
        else {
            openmdao.uniqueID = 1;
        }
        this.id = "BaseFrame"+openmdao.uniqueID;
    }

    // add to list of frames
    if (! openmdao.hasOwnProperty('frames')) {
        openmdao.frames = { };
    }
    openmdao.frames[this.id] = this;

    // if the elm doesn't exist, create it as a popup
    if (this.elm && this.elm.length > 0) {
        this.par = this.elm.parent();
    }
    else {
        this.par = null;
        this.elm = jQuery('<div id='+this.id+'></div>');
        this.popup(this.title);
    }

    // delete any existing content and prevent browser context menu
    this.elm.html("")
            .bind("contextmenu", function(e) { return false; });

    // create menubar and add menu if one has been provided
    if (this.menu) {
        var menuID = this.id+"-menu",
            menuDiv = this.elm.append("<nav2 id='"+menuID+"'>"),
            style = "style='position:absolute;top:5px;right:5px;z-index:1001'",
            popButton = jQuery("<div title='Pop Out' "+style+">*</div>");
        popButton.click( function() { this.popup(this.title); }.bind(this) );
        new openmdao.Menu(menuID,this.menu);
        // FIXME: HACK, add button to make window pop out
        // (TODO: alternately open in new browser window?)
        menuDiv.append(popButton);
    }
}