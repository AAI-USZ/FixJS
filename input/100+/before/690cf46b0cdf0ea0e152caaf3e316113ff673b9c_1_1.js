function() {
    if (this.sectionId > main.portal.numsections) {
        // no need to do anything in orphaned sections
        return;
    }

    var commandContainer = YAHOO.util.Dom.getElementsByClassName('right',null,this.getEl())[0];

    //clear all but show only button
    var commandContainerCount = commandContainer.childNodes.length;

    for (var i=(commandContainerCount-1); i>0; i--) {
        commandContainer.removeChild(commandContainer.childNodes[i])
    }

    if (main.getString('courseformat', this.sectionId) != "weeks" && this.sectionId > 0) {
        var highlightbutton = main.mk_button('div', main.portal.icons['marker'], main.getString('marker', this.sectionId),
                [['class', 'button highlightbutton']], [['class', 'highlightimage']]);
        YAHOO.util.Event.addListener(highlightbutton, 'click', this.mk_marker, this, true);
        commandContainer.appendChild(highlightbutton);
        this.highlightButton = highlightbutton;
    }
    if (this.sectionId > 0) {
        var viewbutton = main.mk_button('div', main.portal.icons['hide'], main.getString('hidesection', this.sectionId),
                [['title', main.portal.strings['hide']],['class', 'button hidebutton']], [['class', 'hideimage']]);
        YAHOO.util.Event.addListener(viewbutton, 'click', this.toggle_hide, this,true);
        commandContainer.appendChild(viewbutton);
        this.viewButton = viewbutton;
    }
}