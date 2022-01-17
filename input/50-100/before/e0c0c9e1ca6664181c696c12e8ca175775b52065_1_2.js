function(e){
	
			var fullPath = (new Path(Workbench.getProject())).append(this._whereMenu.attr('value')).append(this.fileDialogFileName.get( 'value'));
			
			this.value =  fullPath.toString();
			this.cancel = false;

			return true
		}