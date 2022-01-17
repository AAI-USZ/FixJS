function() {

				var number = new Text();

				number.text = this.number;

				number.color = '#000';

				number.font = 'bold 7px Arial';

				number.textAlign = 'center';

				number.textBaseline  = 'middle';

				number.x = 0;

				number.y = 0;	
				
				if (this.isDown) {

					number.rotation = 90;

				} else if (this.isStunned) {

					number.rotation = 180;
				}

				return number;
			}