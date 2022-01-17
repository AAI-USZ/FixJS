function() {
					if(_this.worksheet.current_cell_id === _this.id) {
						_this.worksheet.current_cell_id = -1;
					}
					if(_this.input !== _this.codemirror.getValue()) {
						// the input has changed since the user focused
						// so we send it back to the server
						_this.send_input();
					}
					
					// update cell properties without rendering
					_this.update();
				}