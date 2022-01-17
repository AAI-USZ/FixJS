function() {
		var URL = 'http://www.stubhub.com/listingCatalog/select?';
		var lat = geoip_latitude();
		var lon = geoip_longitude();
		var radiusInKm = 120;
		
		if(typeof window.app.geo.get('loc') == 'undefined') {
			if( typeof lat != 'undefined' && typeof lon != 'undefined' && typeof radiusInKm != 'undefined') {
				URL +='fq={!geofilt pt='+lat+','+lon+' sfield=lat_lon d='+radiusInKm+'}&';
			}
		}

		URL +='q=stubhubDocumentType:event';
		
		if(typeof this.meta('allowedViewingDomain') != 'undefined') {
			URL +=' +allowedViewingDomain:'+ this.meta('allowedViewingDomain') +' ';
		}
		
		if(typeof this.meta('description') != 'undefined') {
			URL += ' AND description:%22' + this.meta('description') + '%22 ';
		}
		
		// URL += ' AND event_date_local:'+ this.meta('timeRange') +'';
		if(typeof this.meta('event_date_time_local') != 'undefined') {
			URL += ' AND event_date_time_local:' + this.meta('event_date_time_local');
		}
		
		if(typeof this.meta('venue_name_text') != 'undefined') {
			URL += ' AND venue_name_text:"'+ this.meta('venue_name_text') +'" ';
		}

		if(typeof window.app.geo.get('loc') != 'undefined') {
			URL += ' AND ancestorGeoDescriptions:%22' + window.app.geo.get('loc') + '%22';
		}

		URL += ' AND active:1 ' + '&sort=event_date_time_local%20asc&rows=200'
		
		if( typeof this.meta('query') != 'undefined') {
			URL +=' AND '+ this.meta('query');
		}

		// URL +='fl=event_date_time_local+'
		
		URL +='&version=2.2&start=0&rows=10&indent=on&wt=json';
		
		console.log('returning url', URL);
		
		return HttpUtil.prependProxyUrl(URL);
	}