function deleteItem() {
	var ask = confirm("Are you sure you want to delete this chore?");
	if(ask){
		localStorage.removeItem(this.key);
		window.location.reload();
	}else{
		alert("Chore was not deleted!");
		window.location.reload();
		return false;
	}
    }