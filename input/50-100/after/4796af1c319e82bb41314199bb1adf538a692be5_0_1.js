function (error, response, body) {
  				if (!error && response.statusCode == 200) {
  					console.log(body);
  					var answer = JSON.parse(body);
  					res.render('index', {
          'title':answer,
          'user':req.currentUser,
          'menu':res.menu,
          'headerStats': res.headerStats,
          'categoryList' : categories,
          'scripts':[],
          'styles':[]
        });
	   			}	
  			}