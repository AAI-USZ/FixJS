function(e){
			var fullPath = (new Path(Workbench.getProject())).append(this._whereMenu.attr('value')).append(this.fileDialogFileName.get( 'value'));
			
			this.value = fullPath.toString();

			var check = this.checkFileName(this.value);
			if (check) {
				return true
			} else {
				return false;
			}
		}