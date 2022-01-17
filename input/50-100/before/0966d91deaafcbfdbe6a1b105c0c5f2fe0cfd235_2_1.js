function addApplication(app) {
	li = '<li><a href="#" id="nav-'+app['name']+'" data-switch="'+app['name']+'"><img src="'+app['icon-small']+'"/>'+app['title']+'</a></li>';
	$('#nav .nav-list').append(li);
	tr = '<tr><td><a href="#" data-switch="'+app['name']+'"><img src="'+app['icon-big']+'"/>'+app['title']+'</a></td></tr>';
	$('#table-launchers').append(tr);
}