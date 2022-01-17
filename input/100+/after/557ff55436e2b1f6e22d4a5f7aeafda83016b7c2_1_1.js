function(){
		
		var hbounds = data.getVisibleTimeBounds();
        var hmin = hbounds[0];
        var hmax = hbounds[1];
        var hdif = hmax - hmin;
        
        var vbounds = data.getVisibleDataBounds(true);
        var vmin = vbounds[0];
        var vmax = vbounds[1];
        var vdif = vmax - vmin;
        
        vmin -= vdif * 0.05;
        vmax += vdif * 0.05;
        vdif = vmax - vmin;
        
        var timeField = 0;
        
        for (var f in data.fields) {
            if (data.fields[f].type_id == 7) {
                timeField = f;
                break;
            }
        }
        
	
		// --- Display point-by-point --- //
	
		for( var i = 0; i < data.sessions.length; i++ ){
		
			for( var j = 0; j < data.fields.length; j++ ){
				
				var displaydata = data.getDataFrom(i,j);
				
				var timedata = data.getDataFrom(i,timeField); // time
				
				var datalen = displaydata.length;
			
				var plotarray = new Array();
			
				var inc = 0;
				
				/*
				
				if( data.sessions[i].visibility == 1 && data.fields[j].visibility == 1 ){
			
					for( var k = 0; k < datalen; k++ ){						
			
						if( data.fields[j].type_id ){ // if j == 1 should actually check for not time bkmk
			
							if( (timedata[k]-hmin)/hdif >= this.hRangeLower && (timedata[k]-hmin)/hdif <= this.hRangeUpper && (displaydata[k]-vmin)/vdif >= this.vRangeLower && (displaydata[k]-vmin)/vdif <= this.vRangeUpper ){
				
								plotarray[inc] = new Array();
	
								plotarray[inc][0] = (timedata[k]-hmin)/hdif;
	
								plotarray[inc][1] = (displaydata[k]-vmin)/vdif;
	
								inc++;
					
							} else {
								
								//..//
								
								plotarray[inc] = new Array();
	
								plotarray[inc][0] = null;
	
								plotarray[inc][1] = null;
								
								inc++;
								
							}
			
						}
			
					}
				
				}
				
				*/ //bkmk for interpolation code
				
				if( data.sessions[i].visibility == 1 && data.fields[j].visibility == 1 ){
				
					var numpoints = this.minpoints > datalen ? this.minpoints : datalen;
				
					for( var k = 0; k < numpoints; k++ ){
						
						var pos		= k*datalen/numpoints;
						var floor 	= Math.floor(pos);
						var ceil	= Math.ceil(pos);
						
						var xdata	= timedata[floor]*(ceil-pos) + timedata[ceil]*(pos-floor);
						var ydata	= displaydata[floor]*(ceil-pos) + displaydata[ceil]*(pos-floor);
						
						//console.log( "(" + datalen + ", " + numpoints + ")" );
						
						//xdata = timedata[floor];
						//ydata = displaydata[floor];
						
						xdata = (xdata-hmin)/hdif;
						ydata = (ydata-vmin)/vdif;
						
						plotarray[k] = new Array();
						
						if( xdata >= this.hRangeLower && xdata <= this.hRangeUpper && ydata >= this.vRangeLower && ydata <= this.vRangeUpper ){
						
							plotarray[k][0] = xdata;
							plotarray[k][1] = ydata;
							
						} else {
							
							plotarray[k][0] = null;
							plotarray[k][1] = null;
							
						}
						
					}
					
				}
				
				var color = getFieldColor(j, i);

				this.context.strokeStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + ", 0.825)";

			    this.context.lineWidth = 1 + (j/data.fields.length);
		
				if( data.fields[j].type_id != 7 && data.fields[j].type_id != 19 && data.fields[j].type_id != 37 ) this.plot(plotarray);
			
			}
		
		}
		
	}