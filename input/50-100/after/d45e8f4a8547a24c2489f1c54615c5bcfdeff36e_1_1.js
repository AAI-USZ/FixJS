function _showPopup(item, panTo) {
    DATA.map.closePopup();
    if (item.marker && item.config.popup) {
      var popup = item.marker._popup.setLatLng(item.marker.getLatLng());
      DATA.map.openPopup(popup);
    }

    // determine the center
    DATA.map.setView(item.center, item.zoom || DATA.map.getZoom(), panTo ? false : true);
  }