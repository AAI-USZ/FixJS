function clearLocal(){
		if (localStorage.length===0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All Honey Do items are deleted!");
			window.location.reload();
			return false;
		}
	}