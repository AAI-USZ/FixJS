function(e){
			
			// If no current mode, do nothing. Conditional binding would be prettier.
			if(!this.mode) {
				return;
			}

			e.preventDefault();

			var ev = this.getTouch(e);
			
			var point = new Vector(ev.clientX, ev.clientY);
			var center = this.center;
			var anchor = this.anchor;
			var offset = this.offset;
			var matrix = this.display;

			/**
			 * transform the current matrix based on the mode (classname) of the dragged handle
			 *
			 * <3 math <3
			 */
			 var actualmode = this.mode.split(" ")[0];
			switch (actualmode) {
				case 'rotate':
					var moved = point.subtract(anchor);
					var y = moved.y;
					var x = point.subtract(center).x;
					var r = Math.atan2(y, x);
					matrix = matrix.rotate(r);
				break;

				case 'scale':
					var moved = point.subtract(center);
					var scaled = moved.divide(offset);
					matrix = matrix.scale(scaled);
				break;

				case 'move':
					var moved = point.subtract(anchor);
					matrix = matrix.translate(moved);
				break;

				case 'skewx':
					var moved = point.subtract(anchor);
					matrix = matrix.skew(
						new Vector(moved.x/offset.y, 0)
					);
				break;

				case 'skewy':
					var moved = point.subtract(anchor);
					matrix = matrix.skew(
						new Vector(0, moved.y/offset.x)
					);
				break;
			}

			// store and show the current transformation
			this.current = matrix;
			targetobject = $(editedobject).attr("id");
			this.transform(matrix);
			console.log(this+" aodeeeee");
			
			//targetobject.transform(matrix);
		}