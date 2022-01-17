function(select,from,orderby,limit){

		params = [];

		if(!this.getDB()[from].length){

			this.errors.push('Table \''+from+'\' has no data in database!.');

			console.error('Table \''+from+'\' has no data in database!.');

			return [[],[],this.errors];

		}

		db = this.getDB()[from][0];



		for(i=0;i<orderby.length;i++){

			field = orderby[i][0]; // order column

			byPos = orderby[i][1];



			if(byPos){ // asc

				if( typeof db[field] == 'number' ){

					if(db[field]%1!==0){ // float

						params.push({name:field,primer: parseFloat, reverse:false});

					}else{

						params.push(field);

					}

				}else{

					params.push({name:field,reverse:false}); // string

				}

			}else{ // desc

				if( typeof db[field] == 'number' ){

					if(db[field]%1!==0){ // float

						params.push({name:field,primer: parseFloat, reverse:true});

					}else{

						params.push({name:field,primer: parseInt, reverse:true});

					}

				}else{

					params.push({name:field,reverse:true});

				}

			}



		}



		db = this.getDB()[from].sort(sortby.sort_by(params)); // sort the table

		

		results = [];

		for(j=0;j<db.length;j++){

			data=[];

			for(i=0;i<select.length;i++){

				data.push(db[j][select[i]]);

			}

			results.push(data);

		}



		if(!select.length){

			return [[],[],this.errors];

		}

		

		if(typeof limit == 'number'){ // limit <x>

			if(limit>0){

				results = results.slice(0,limit);

			}

		}else{

			// limit <x>,<y>

			limit = limit.split(',');

			a=parseInt(this.trim(limit[0]),10);

			b=parseInt(this.trim(limit[1]),10);

			if(a<b){

				results = results.slice(a,b);

			}else{

				this.errors.push('LIMIT \''+a+'\' must be smaller than \''+b+'\' in selected query. Showing all results.');

				console.error('LIMIT \''+a+'\' must be smaller than \''+b+'\' in selected query. Showing all results.');

			}

		}



		return [select,results,this.errors];

	}