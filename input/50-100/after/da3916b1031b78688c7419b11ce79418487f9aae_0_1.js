function(rowid) {
        var marker = hell.map.allmarkers[$('#tab').jqGrid('getRowData',rowid).id];
        if (!marker)
          return true;;

        hell.map.panTo(marker.getLatLng());
        marker.openPopup();
        return true;
      }