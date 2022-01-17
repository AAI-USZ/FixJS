function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 256,
			height		: 256,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000",
                        roundCnr	: 0,
                        fixDimensions	: true // rounding works best when all blocks have the same square dimensions - true uses closest size gt/lt zero rounds up/down respectively
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// check if the dimensions need to be modified
			if(options.roundCnr!=0 && options.fixDimensions!=false){
				if(options.fixDimensions===true){ // round to closest
					var fixFunc = Math.round;
				}
				else if(options.fixDimensions>0){
					var fixFunc = Math.ceil;
				}
				else {
					var fixFunc = Math.floor;
				}
				options.width = fixFunc(options.width/qrcode.getModuleCount()) * qrcode.getModuleCount();
				options.height = fixFunc(options.height/qrcode.getModuleCount()) * qrcode.getModuleCount();
			}

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// corners are rounded based on their neighbors - relative coordinates for neighbors
			// see explanation of rules later
			var cornerCheck = {
				tl	: [-1, -1],
				tr	: [-1, 1],
				bl	: [1, -1],
				br	: [1, 1]
			};

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					var iAmDark = qrcode.isDark(row, col);
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					
					//base fill with opposite so that corners work
					ctx.fillStyle = iAmDark ? options.background : options.foreground;
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
					
					ctx.fillStyle = iAmDark ? options.foreground : options.background;

					// object to be passed to fillRectRnd()
					var corners = {}
					for(var c in cornerCheck){
						var coord = cornerCheck[c];
						
						try { // throw an exception any time a decision is made not to round this corner
							if(options.roundCnr==0){
								throw null;
							}
							
							/*
							 * corners are rounded based on respective neighbors (i.e. top-left corner uses top-left 3 neighbors: t, l & tl)
							 * dark uses vertical and horizontal neighbors
							 * light ALSO uses diagonal neighbor
							 */
							var neighbors = [
								[row+coord[0], col],
								[row, col+coord[1]]
							];
							if(!iAmDark){
								neighbors.push([row+coord[0], col+coord[1]]);
							}

							for(var n in neighbors){
								nX = neighbors[n][0];
								nY = neighbors[n][1];
								
								if(iAmDark){ // don't round if either neighbor is also dark
									if(	!(nX<0 || nY<0 || nX>=qrcode.getModuleCount() || nY>=qrcode.getModuleCount()) //check boundaries so isDark() doesn't throw an error
										&& qrcode.isDark(nX, nY)
									){
										throw null;
									}
								}
								else { // round only when all 3 neighbors are dark
									if(nX<0 || nY<0 || nX>=qrcode.getModuleCount() || nY>=qrcode.getModuleCount() || !qrcode.isDark(nX, nY)){
										throw null;
									}
								}
							}
							corners[c] = options.roundCnr;
						}
						catch(e){
							corners[c] = 0;
						}

					}
					ctx.fillRectRnd(Math.round(col*tileW),Math.round(row*tileH), w, h, corners);
				}	
			}
			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			$(element).appendTo(this);
		});
	}