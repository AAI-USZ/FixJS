function MapsWindow() {
	// Geolocation default settings
	Ti.Geolocation.purpose = "Recieve User Location";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;

	//create module instance
	var self = Ti.UI.createWindow({
		title: "Conference Map",
		navBarHidden: false
	});
	
	var refreshButton = Ti.UI.createButton({
		title: 'Refresh'
	})
	
	refreshButton.addEventListener('click', function(e){
		Ti.Geolocation.getCurrentPosition(function(e) {
		    if (e.error) {
		        return; 
		    }
		
		    mapview.setLocation({
		        latitude : e.coords.latitude,
		        longitude : e.coords.longitude,
		        latitudeDelta : 0.02,
		        longitudeDelta : 0.02
		    });
		});
	   	mapview.annotations = annotations;
	});
	self.rightNavButton = refreshButton;
	
	
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');

	var annotations = [];

    //Get annotations from database
    var annotationsSet = db.execute('SELECT * FROM annotations');
    while (annotationsSet.isValidRow()) {
		annotations.push(
			Ti.Map.createAnnotation({
		    	latitude: annotationsSet.fieldByName('latitude'),
		    	longitude: annotationsSet.fieldByName('longitude'),
				title: annotationsSet.fieldByName('title'),
				subtitle: annotationsSet.fieldByName('subtitle'),
				pincolor: Ti.Map.ANNOTATION_GREEN,
				className: 'annotation',
			})	
		);
    	annotationsSet.next();
    }
    annotationsSet.close();
	
	
	
/*	
	// map annotations
	var annotations = [
	    Ti.Map.createAnnotation({
	        latitude: 30.214968,
	        longitude: -92.018488,
	        title: 'B.I. Moody',
	        subtitle: 'Conference Registration',
	        animate: true,
	        pincolor: Ti.Map.ANNOTATION_GREEN
	        //leftButton: 'moody.png'
	    }),
	    Ti.Map.createAnnotation({
	        latitude: 30.215084,
	        longitude: -92.019395,
	        title: 'F.G. Mouton',
	        subtitle: 'Competitions',
	        animate: true,
	        pincolor: Ti.Map.ANNOTATION_GREEN
	        //rightButton: 'mouton.png'
	    }),
	    Ti.Map.createAnnotation({
	        latitude: 30.212771,
	        longitude: -92.021192,
	        title: 'Conference Center',
	        subtitle: 'Subtitle',
	        animate: true,
	        pincolor: Ti.Map.ANNOTATION_GREEN
		}),
	    Ti.Map.createAnnotation({
	        latitude: 30.218420,
	        longitude: -92.038881,
	        title: 'Cajundome',
	        subtitle: 'Subtitle',
	        animate: true,
	        pincolor: Ti.Map.ANNOTATION_GREEN
		}),
	    Ti.Map.createAnnotation({
	        latitude: 30.220044,
	        longitude: -92.041250,
	        title: 'Hilton Hotel',
	        subtitle: 'Subtitle',
	        animate: true,
	        pincolor: Ti.Map.ANNOTATION_RED
		}),
	    Ti.Map.createAnnotation({
	        latitude: 30.207712,
	        longitude: -92.019473,
	        title: 'Festival Acadien 2012',
	        subtitle: 'Girard Park',
	        animate: true,
	        pincolor: Ti.Map.ANNOTATION_PURPLE
		})
	];*/
	
	var mapview = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude:30.212771, longitude: -92.021192,
	            latitudeDelta:0.02, longitudeDelta:0.02},    
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    annotations: annotations
	});
		
	Ti.Geolocation.getCurrentPosition(function(e) {
	    if (e.error) {
	        return; 
	    }
	
	    mapview.setLocation({
	        latitude : 30.212771,
	        longitude : -92.021192,
	        latitudeDelta : 0.02,
	        longitudeDelta : 0.02
	    });
	});
	
	self.add(mapview);

	return self;
}