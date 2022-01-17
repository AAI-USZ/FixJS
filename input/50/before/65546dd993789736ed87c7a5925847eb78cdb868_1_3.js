function (evt) {
    var caller = this;
    if(caller.popup==null)
        fillPopup(caller);
    else showPopup(caller.popup);
    OpenLayers.Event.stop(evt);
}