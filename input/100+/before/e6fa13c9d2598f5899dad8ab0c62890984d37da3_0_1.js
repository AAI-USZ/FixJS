function(isWorkingCopy){

		this.editor.save(isWorkingCopy);

		this.setDirty(isWorkingCopy);

	}