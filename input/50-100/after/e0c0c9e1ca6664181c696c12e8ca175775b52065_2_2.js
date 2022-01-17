function(){
			this.value = this.fileDialogParentFolder.innerHTML + "/" + this.folderName.get( 'value');		

			var check = this.checkFileName(this.value);
			if (check) {
				return true
			} else {
				return false;
			}
		}