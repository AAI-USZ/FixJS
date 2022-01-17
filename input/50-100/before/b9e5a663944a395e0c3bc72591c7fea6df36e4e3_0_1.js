function(rowid) {
        var marker = map.allmarkers[$('#tab').jqGrid('getRowData',rowid).id];
        if (!marker)
          return;

        map.panTo(marker.getLatLng());
        marker.openPopup();
        return true;
      }