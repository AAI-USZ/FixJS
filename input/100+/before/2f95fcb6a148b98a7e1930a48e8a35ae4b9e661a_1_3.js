function(map_id, obOut, jsMess)

{

	var _this = this;

	this.map_id = map_id;

	this.map = GLOBAL_arMapObjects[this.map_id];

	this.obOut = obOut;

	if (null == this.map)

		return false;

	this.arSearchResults = [];

	this.jsMess = jsMess;

	this.__searchResultsLoad = function(geocoder)

	{

		if (null == _this.obOut)

			return;

		_this.obOut.innerHTML = '';

		_this.clearSearchResults();

		var obList = null;

		if (len = geocoder.length()) 

		{

			obList = document.createElement('UL');

			obList.className = 'bx-yandex-search-results';

			var str = '';

			str += _this.jsMess.mess_search + ': <b>' + len + '</b> ' + _this.jsMess.mess_found + '.';

			for (var i = 0; i < len; i++)

			{

				_this.arSearchResults[i] = geocoder.get(i);

				_this.map.addOverlay(_this.arSearchResults[i]);

				YMaps.Events.observe

				(

					_this.arSearchResults[i],

					_this.arSearchResults[i].Events.Click,

					function(pm, ev)

					{

						GLOBAL_arMapObjects[map_id].setCenter(pm.getGeoPoint(), (pm.precision == 'other' || pm.precision == 'suggest' ? 10 : 15));

						clearSerchResults(map_id, _this.arSearchResults);

					}

				);

				var obListElement = document.createElement('LI');

				var obLink = document.createElement('A');

				obLink.href = "javascript:void(0)";

				obLink.appendChild(document.createTextNode(_this.arSearchResults[i].text));

				obLink.BXSearchIndex = i;

				obLink.onclick = _this.__showandclearResults;

				obListElement.appendChild(obLink);

				obList.appendChild(obListElement);

			}

			JCBXYandexSearch_arSerachresults = _this.arSearchResults;

			document.getElementById('clear_result_link').style.display = 'inline';

		} 

		else 

		{

			var str = _this.jsMess.mess_search_empty;

		}

		_this.obOut.innerHTML = str;

		if (null != obList)

			_this.obOut.appendChild(obList);

			

		_this.map.redraw();

	};

	this.__showandclearResults = function(index)

	{

		if (null == index || index.constructor == window.Event);

			index = this.BXSearchIndex;

		

		if (null != index && null != _this.arSearchResults[index])

		{

			_this.arSearchResults[index].openBalloon();

			_this.map.setCenter(_this.arSearchResults[index].getGeoPoint(), (_this.arSearchResults[index].precision == 'other' || _this.arSearchResults[index].precision == 'suggest' ? 10 : 15));

			document.getElementById("MAPLAT").value = _this.arSearchResults[index].getGeoPoint();

			document.getElementById("MAPZOOM").value = _this.map.getZoom();

			_this.clearSearchResults();

		}

		var ob = document.getElementById('results_' + _this.map_id);

		if(!ob)

		{

			return;

		}

		ob.innerHTML = '';

		document.getElementById('clear_result_link').style.display = 'none';

	}

	this.__showSearchResult = function(index)

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

	};

	this.searchByAddress = function(str)

	{

		str = str.replace(/^[\s\r\n]+/g, '').replace(/[\s\r\n]+$/g, '');

		if (str == '')

			return;

		

		geocoder = new _this.map.bx_context.YMaps.Geocoder(str);

		_this.map.bx_context.YMaps.Events.observe(

			geocoder, 

			geocoder.Events.Load, 

			_this.__searchResultsLoad

		);

		_this.map.bx_context.YMaps.Events.observe(

			geocoder, 

			geocoder.Events.Fault, 

			_this.handleError

		);

	}

}