function() {
      var newVal, overlayProjection, pos, shareInput, val;
      overlayProjection = this.getProjection();
      pos = overlayProjection.fromLatLngToDivPixel(this.marker.position);
      shareInput = this.wrap.find('[name="share-link"]');
      val = shareInput.val();
      newVal = val.split("?")[0] + "?lat=" + this.marker.position.lat() + "&lng=" + this.marker.position.lng();
      shareInput.val(newVal);
      return this.wrap.css({
        left: pos.x + 30,
        top: pos.y - 80
      });
    }