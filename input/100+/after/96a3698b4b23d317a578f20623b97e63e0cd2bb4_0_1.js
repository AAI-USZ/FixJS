function preloadXML(xmlData, isTMX, onload, onerror) {
			var onloadCB = onload;
			if ($.XMLHttpRequest) {
				// code for IE7+, Firefox, Chrome, Opera, Safari
				var xmlhttp = new XMLHttpRequest();
				// to ensure our document is treated as a XML file
				if (xmlhttp.overrideMimeType)
					xmlhttp.overrideMimeType('text/xml');
			} else {
				// code for IE6, IE5
				var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				// I actually don't give a **** about IE5/IE6...
			}
			// load our XML
			xmlhttp.open("GET", xmlData.src + me.nocache, false);
			xmlhttp.onerror = onerror;
			xmlhttp.onload = function(event) {
				// set the xmldoc in the array
				xmlList[xmlData.name] = {};
				xmlList[xmlData.name].xml = xmlhttp.responseText;
				xmlList[xmlData.name].isTMX = isTMX;
				// callback
				onloadCB();
			};
		
			// send the request
			xmlhttp.send();

		}