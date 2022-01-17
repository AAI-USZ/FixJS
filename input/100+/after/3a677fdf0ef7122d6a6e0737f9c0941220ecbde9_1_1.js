function deleteUser(el, user) {

	parameters = {delete_user:user, method: 'get'};	

	var url    = location.toString();

	ajaxRequest(el, url, parameters, onDeleteUser);	

}