function(){
				svgCanvas.setStrokeAttr('stroke-dasharray', $(this).val());
				$("#stroke_style_label").html(this.options[this.selectedIndex].text)
				operaRepaint();
			}