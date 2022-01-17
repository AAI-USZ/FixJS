function (error, response, body) {
  				if (!error && response.statusCode == 200) {
  					console.log(body);
  					var answer = JSON.parse(body);
  					  res.render('about', {
    'title':"О проекте",
    'user':req.currentUser,
    'menu':res.menu,
    'headerStats': res.headerStats,
    'scripts':[],
    'styles':[]
  }); 
	   			}	
  			}