function(req, res){
	var error = "",
		count = 0,
		i = 0,
		t = process.hrtime();
	try{
		var key = req.session.customer.key;
		csv().fromPath(req.files.file.path).transform(function(data){
			count = data.length;
			if(data[0].length === 0){
				data.splice(0,1);
				return data;
			}else{
				return data;
			}
		}).on('data',function(data,index){
			var cust = new Customer();
			var price, req_data;
			if(!isNaN(data[0]) && data[0] !== undefined && data[0].length > 0){
				price = {
					partID: data[0],
					custPartID: data[1],
					price: (data[2] !== undefined)? data[2] : 0,
					sale_start: (data[3] !== undefined)? data[3] : '',
					sale_end: (data[4] !== undefined)? data[4] : ''
				};

				req_data = {
					customerID: req.session.customer.customerID,
					key: key,
					partID: price.partID,
					customerPartID: (price.custPartID.length === 0)?0:price.custPartID,
					price: price.price,
					isSale: (price.sale_start !== null && price.sale_start.length > 0 && price.sale_end !== null && price.sale_end.length > 0)? 1: 0,
					sale_start: price.sale_start,
					sale_end: price.sale_end
				};
				cust.submitPrice(req_data,function(resp){
					if(resp.length > 0){
						new Error(resp);
					}
				});
				cust.submitIntegration(req_data,function(resp){
					if(resp.length > 0){
						new Error(resp);
					}
					i++;
					if(i === count){
						t = process.hrtime(t);
						console.log('benchmark took %d seconds', t[0]);
						res.redirect('/');
					}
				});
			}
		}).on('end',function(count){

		}).on('error',function(error){
			//res.redirect('/upload?error=' + error.message);
			error += error.message;
		});
	}catch(e){ }
}