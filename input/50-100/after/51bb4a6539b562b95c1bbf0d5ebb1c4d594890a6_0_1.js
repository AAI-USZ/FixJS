function(){
			var target = $('#child-'+this.id);
			var id = this.id.substring(1);
			target.toggle();
			// Toggle display of the details and store this state
			if (target.is(":visible")){
				selectedIDs.push(id);
			} else {
				selectedIDs.splice($.inArray(id, selectedIDs), 1);
			}
			console.log("Halt");
	}