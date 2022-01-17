function() {
					
				jQuery("<div></div>")
					.appendTo("body")
					.css({ 
						position: "fixed", 
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