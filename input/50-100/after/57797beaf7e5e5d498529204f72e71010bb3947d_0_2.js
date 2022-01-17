function(rowid) {
        var marker = hell.map.allmarkers[$('#tabt').jqGrid('getRowData',rowid).id];
        if (!marker) {
          hell.map.closePopup();
          return true;
        }

        hell.map.panTo(marker.getLatLng());
        marker.openPopup();
        return true;
      }