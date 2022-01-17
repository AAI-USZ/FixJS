function(){
			var HTML = '';
			//only bother rendering if we can actually see this screen
			if (this.css['opacity'] > 0){
				HTML += '<div id =' + this.id + ' style="';
				for(x in this.css){
					HTML += x + ':' + this.css[x] + '; ';
				}
				HTML += '" >';
				for (x in this.spriteArray){
					HTML += this.spriteArray[x].draw();
				}
				// $(this.spriteArray).each(function(){
					// HTML += this.draw();
				// });
				HTML += '</div>';
			}
			return(HTML);
		}