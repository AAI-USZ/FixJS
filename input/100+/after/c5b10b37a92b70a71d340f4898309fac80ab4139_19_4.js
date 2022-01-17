function saveEdit(op, edit){
	var remaining = this.parent.adjustPath(this.part)
	if(remaining.length > 0){
		if(remaining.length === 1){
			this.persistEdit('ascend1', {})
		}else if(remaining.length === 2){
			this.persistEdit('ascend2', {})
		}else if(remaining.length === 3){
			this.persistEdit('ascend3', {})
		}else if(remaining.length === 4){
			this.persistEdit('ascend4', {})
		}else if(remaining.length === 5){
			this.persistEdit('ascend5', {})
		}else{
			this.persistEdit('ascend', {many: remaining.length})
		}
	}
	this.persistEdit(op, edit)
}