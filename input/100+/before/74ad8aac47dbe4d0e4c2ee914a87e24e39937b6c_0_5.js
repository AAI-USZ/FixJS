function(action) {
				var normal, 
					highlight,
					caption = action.innerHTML;
				
				// set our styling
				normal = 'bb-bb10-context-menu-item-'+this.res+' bb-bb10-context-menu-item-'+this.res+'-' + bb.actionBar.color;
				highlight = normal + ' bb-bb10-context-menu-item-hover-'+this.res;
				this.appendChild(action);
				this.actions.push(action);
				action.normal = normal;
				action.highlight = highlight;
				// Set our inner information
				action.innerHTML = '';
				var inner = document.createElement('div'),
					img = document.createElement('img');
				img.setAttribute('src', action.getAttribute('data-bb-img'));
				img.setAttribute('class','bb-bb10-context-menu-item-image-'+this.res);
				action.appendChild(img);
				inner.setAttribute('class','bb-bb10-context-menu-item-inner-'+this.res);
				action.appendChild(inner);
				inner.innerHTML = caption;

				action.setAttribute('class',normal);
				action.ontouchstart = function () {
										this.setAttribute('class',this.highlight);
										this.setAttribute('style','border-left-color:'+ bb.options.bb10HighlightColor);
									}
				action.ontouchend = function () {
										this.setAttribute('class',this.normal);
										this.setAttribute('style','');
									}
				action.addEventListener("click", this.hide, false);
		}