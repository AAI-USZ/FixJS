function(i){
					var fraction = this / dataSum;
                    if (fraction <= 0 || isNaN(fraction))
                        return;
					ctx.beginPath();
					ctx.moveTo(centerx, centery);
					ctx.arc(centerx, centery, radius, 
						counter * Math.PI * 2 - Math.PI * 0.5,
						(counter + fraction) * Math.PI * 2 - Math.PI * 0.5,
		                false);
			        ctx.lineTo(centerx, centery);
			        ctx.closePath();
			        ctx.fillStyle = dataGroups[i].color;
			        ctx.fill();
			        // draw labels
			       	var sliceMiddle = (counter + fraction/2);
			       	var distance = o.pieLabelPos == 'inside' ? radius/1.5 : radius +  radius / 5;
			        var labelx = Math.round(centerx + Math.sin(sliceMiddle * Math.PI * 2) * (distance));
			        var labely = Math.round(centery - Math.cos(sliceMiddle * Math.PI * 2) * (distance));
			        var leftRight = (labelx > centerx) ? 'right' : 'left';
			        var topBottom = (labely > centery) ? 'bottom' : 'top';
			        var percentage = parseFloat((fraction*100).toFixed(2));

			        if(percentage){
			        	var labelval = (o.pieLabelsAsPercent) ? percentage + '%' : this;
				        var labeltext = $('<span class="visualize-label">' + labelval +'</span>')
				        	.css(leftRight, 0)
				        	.css(topBottom, 0);
				        	if(labeltext)
				        var label = $('<li class="visualize-label-pos"></li>')
				       			.appendTo(labels)
				        		.css({left: labelx, top: labely})
				        		.append(labeltext);	
				        labeltext
				        	.css('font-size', radius / 8)		
				        	.css('margin-'+leftRight, -labeltext.width()/2)
				        	.css('margin-'+topBottom, -labeltext.outerHeight()/2);
				        	
				        if(dataGroups[i].textColor){ labeltext.css('color', dataGroups[i].textColor); }	
			        }
			      	counter+=fraction;
				}