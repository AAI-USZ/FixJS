function deleteBill (){
		var ask = confirm("Are you sure you want to delete this bill?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Bill was deleted!");
			window.location.reload();
		} else {
			alert("Bill was not deleted");
		}
	}