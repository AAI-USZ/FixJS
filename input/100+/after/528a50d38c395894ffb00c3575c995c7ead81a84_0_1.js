function() {

					// This fix addresses an iOS bug, so return early if the UA claims it's something else.
					var positioning = "fixed";
					var ua = navigator.userAgent;
						if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
						positioning = "absolute";
					}
					
				jQuery("<div></div>")
					.appendTo("body")
					.css({ 
						"position": positioning, 
						"top" : "0",
						"left" : "0",
						"border" : "18px solid #FFFFFF"
					}).qrcode({
						width: 256,
						height: 256,
						text : location.href,
						correctLevel : QRErrorCorrectLevel.L
					}).append(

						jQuery("<a></a>")
							.html("close")
							.attr("href", "#")
							.css({ 
								"background" : "#CCCCCC",
								"display" : "block",
								"textAlign" : "center",
								"textDecoration" : "none",
								"fontSize" : "24px",
								"color" : "black",
								"padding" : "6px",
								"height" : "28px"
							}).click(function(){
								jQuery(this).parent().remove();
							})
					);
				
				}