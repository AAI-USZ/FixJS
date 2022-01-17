function(i, item){

  					//console.log(item);

  					if(first){

  						chartData.addColumn("string", item);

  						first = false;

  					}else{

  						chartData.addColumn("number", parseInt(item));

  						colNumber.push(item);

  					}

  				}