function(req, res){
    req.session.userid = req.param('userid');
        res.redirect('/Warble')
}