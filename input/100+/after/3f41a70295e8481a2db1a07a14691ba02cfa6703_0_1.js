function() {
				var $this = $( this );

				var container = $this.children( "div" ),
					containerID = container.attr( "id" ),
					width       = container.css( "width" ),
					height      = container.css( "height" ),
					textFont    = container.attr( "data-font" ),
					tagsID      = container.children( "div" ).attr('id');

				// Add canvas object
				var canvasID = containerID + '-canvas';
				$this.find( '#' + containerID ).append( '<canvas></canvas>' );
				$this.find( 'canvas' ).attr( 'id', canvasID ).attr( 'width', width ).attr( 'height', height );

				if( !$this.find( '#' + canvasID ).tagcanvas( {
					textColour: null,
					outlineColour: '#FF9D43',
					textFont: textFont,
					reverse: true,
					weight: true,
					shadow: '#ccf',
					shadowBlur: 3,
					depth: 0.3,
					maxSpeed: 0.04
				}, tagsID ) ) {
					// something went wrong, hide the canvas container
					$this.find( '#' + containerID ).hide();
				}
			}