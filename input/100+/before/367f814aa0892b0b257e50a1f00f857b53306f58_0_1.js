function(feature) {
					var regex = new RegExp(/\$\{([^}]+)\}/);
					var match = null;
					
					this.tooltipDiv = document.createElement('div');
					style = document.createAttribute('style');
					style.nodeValue = 'z-index: 3000;position:absolute;left:'+(mouseX+10)+'px;top:'+(mouseY+10)+'px;background-color:#FFFFCC;border:1px solid #BBBBBB;padding:1px;';
					this.tooltipDiv.setAttributeNode(style);
					if(feature.attributes.name.length > 0) {
						this.tooltipDiv.innerHTML = (feature.attributes.name == "None") ? "<p>No Name</p>" :	"<p>"+feature.attributes.name+"</p>";
					} else {
						this.tooltipDiv.innerHTML = "<p>" + eval(regex.exec(clusterAmount)[1]) + " features in this cluster</p>";
					}					document.body.appendChild(this.tooltipDiv);
				},
