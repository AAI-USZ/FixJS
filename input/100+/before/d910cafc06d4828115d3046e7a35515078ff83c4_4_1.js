function(req, res){
	    if (req.session.user == null || req.session.org == null){
			res.redirect('/login');
		}	else{
			res.render('home/offerings', { title : 'Inventory', org:req.session.org, user:req.session.user, services:SV } );
		}
	}