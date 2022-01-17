function(index)

	{

		if (null == index || index.constructor == window.Event);

			index = this.BXSearchIndex;

		if (null != index && null != _this.arSearchResults[index])

		{

			_this.arSearchResults[index].openBalloon();

			_this.map.panTo(_this.arSearchResults[index].getGeoPoint());

			document.getElementById("MAPLAT").value = _this.arSearchResults[index].getGeoPoint();

			document.getElementById("MAPZOOM").value = _this.map.getZoom();

		}

	}