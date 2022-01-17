function showUserList(){
	var v = dojo.byId('search-input').value;

	if(v == ''){
		dojo.addClass('userlistdiv','hidediv');
		dojo.addClass('dimuser','hidediv');
        dojo.byId('mentor_field_box').style.position = 'relative';
	}else{
		dojo.removeClass('userlistdiv','hidediv');
		dojo.removeClass('dimuser','hidediv');
        dojo.byId('mentor_field_box').style.position = 'inherit';
        var allUsers = dojo.query('.userentry a');
		var count = 0;
		allUsers.forEach(function(node) {	
			var n = node.innerHTML.toUpperCase();
			if(n.indexOf(v.toUpperCase()) == 0){
				dojo.removeClass(node.parentNode,'hidediv');
				count++;
			}else{
				dojo.addClass(node.parentNode,'hidediv');
			}
		});
		if(count == 0){
			dojo.addClass('userlistdiv','hidediv');
			dojo.addClass('dimuser','hidediv');
		}
	}
}