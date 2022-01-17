function(req, res, nav){
		var perpage = (!nav || nav.page) ? 10 : 100; // show 100 items for month or search, otherwise 10
		var blogpost = this.db.model('blogPost');
		var page = (nav && nav.page) ? nav.page - 1 : 0;
		var query = {};
		if(nav && nav.search) query = {title: {$regex: new RegExp('.*' + Util.escapeRegEx(nav.search) + '.*', 'i')}}; 
		if(nav && nav.year){
			var start = new Date(nav.year, nav.month - 1, 1);
			var end = new Date(nav.year, start.getMonth() + 1, 1);
			query = {posted: { $gte: start, $lt: end }}; 
		}

		var query = blogpost.find(query);
		
		query.sort("posted", -1).skip(page * perpage).limit(perpage).exec(function(err, docs){
		
			for ( var k in docs ){
				docs[k].link_title = Util.link_title(docs[k].title);
				var new_short = jade.compile(docs[k].short);
				docs[k].short = new_short();
				docs[k].posted_human = Util.human_date(docs[k].posted);
			}
			
			query.count(function(err, postcount){ 
				var totalpages = Math.ceil(postcount / perpage);
				var nextpage = totalpages > page ? page + 1 : false;
				var prevpage = page > 0 ? page - 1 : false;
			
				var render_page = function(monthlist){
					res.render('index', {
							title: 'Blog',
							posts: docs,
							nextpage: nextpage,
							prevpage: prevpage,
							months: monthlist,
							month_names: new Array("January","February","March","April","May","June","July","August","September","October","November","December"),
							showFullNav: nav
						});
				}
				
				var map = function(){
					emit( this.posted.getFullYear() + '-' + this.posted.getMonth() , { count: 1, year: this.posted.getFullYear(), month: this.posted.getMonth() } );
				};
				
				var reduce = function(key, values){
					var result = { 
						count: values.length,
						month: values[0].month,
						year: values[0].year
					};
				    return result;
				};
				
				blogpost.collection.mapReduce(
					map.toString()
					, reduce.toString()
					, {out: { inline: 1 }}
					, function(err, monthlist){
						//console.info(err);
						//console.info(monthlist);
						monthlist.reverse();
						render_page(monthlist);
					}
				);
			});
		});
		
	}