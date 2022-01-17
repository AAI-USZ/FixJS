function(e) {
			
				e.stop();
				
				var el = this, co = el.getCoordinates();
				
				el.getFirst().setStyles({
											left: co.left,
											top: co.top, 
											width: co.width, 
											height: 24,
											backgroundColor: '#E1F1FD',
											textAlign: 'center',
											display: 'block',
											zIndex: 10
										}).tween('backgroundColor', '#1096E6')										
			}