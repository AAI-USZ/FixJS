function(req, res) {
	console.log('ololololo');
	var code = req.query.code;
	console.log(code);
	var request = require('request');
  	request({uri:'https://oauth.vk.com/access_token?client_id='+'2981571'+'&client_secret='+'mJloUt73SYT6K9vFmxfi'+'&code='+code}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			console.log(body);
  			var answer = JSON.parse(body);
  			console.log(answer);
  			console.log('...');
  			console.log(answer.user_id); 
  			
  			request({uri:'https://api.vk.com/method/getProfiles?uid='+answer.user_id+'&access_token='+answer.access_token}, function (error, response, body) {
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
  			})
  						
   		}	
  	})
	
  res.redirect('/');
}