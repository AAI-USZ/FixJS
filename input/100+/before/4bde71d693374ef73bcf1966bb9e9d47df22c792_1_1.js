function() {
		var URL = 'http://www.stubhub.com/listingCatalog/select?';
		/*var lat = geoip_latitude();
		var lon = geoip_longitude();
		var radiusInKm = 60;*/
		
		if( typeof lat != 'undefined' && typeof lon != 'undefined' && typeof radiusInKm != 'undefined') {
			URL +='fq={!geofilt pt='+lat+','+lon+' sfield=lat_lon d='+radiusInKm+'}&';
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
		
		URL += ' AND active:1 ';
		
		if( typeof this.meta('query') != 'undefined') {
			URL +=' AND '+ this.meta('query');
		}
		
		URL +='&version=2.2&start=0&rows=10&indent=on&wt=json';
		
		console.log('returning url', URL);
		
		return HttpUtil.prependProxyUrl(URL);
	}