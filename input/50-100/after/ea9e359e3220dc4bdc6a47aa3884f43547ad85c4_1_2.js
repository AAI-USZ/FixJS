function deleteItem(){
		  var ask = confirm("Are you sure you want to delete this comic?");	    //confirmation to delete the comic
		  if(ask){																//if yes its ok to delete
			  localStorage.removeItem(this.key);								//removed the key from local storage
			  alert("Comic was deleted!!");									    //tells us the comic was deleted
			  //window.location.reload();											//reloads the window
		  }else{
			  alert("Comic was NOT deleted.");								    //Otherwise the comic was not deleted
		  }
	  }