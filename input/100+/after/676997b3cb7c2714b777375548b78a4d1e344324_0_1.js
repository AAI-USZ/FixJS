function(model,opts) {
		
			//basepath = basepath != null && basepath !== '' ? basepath : '/api';
			var opts = opts != null ? opts : {};
			var default_options = {
				regexp: null,
				basepath: '/api',
				engine: 'sequelize',
				limit: 10,
				onBefore: null,
				onAfter: null,
				onBeforeAll: null,
				onAfterAll: null,
				onBeforeGet: null,
				onAfterGet: null,
				onBeforePost: null,
				onAfterPost: null,
				onBeforePut: null,
				onAfterPut: null,
				onBeforeDelete: null,
				onAfterDelete: null,
				onResponse: null			
				};
			var options = Object.merge(default_options,opts);

			var engine = engines[options.engine];						
			var restUrl = options.basepath+'/'+model.name.toLowerCase();
			
			console.log('Attaching end point: '+restUrl);
			
			// list elements
			app.get(
				restUrl,
				function (req,res,next) {
					
					var offset = req.param('offset',0);
					var limit = req.param('limit',options.limit);
					// build query string
					req.queryString = {
						offset: offset, 
						limit: limit 
						};
					
					return next();
					},				
				options.onBefore != null ? options.onBefore : [],
				options.onBeforeAll != null ? options.onBeforeAll : [],				
				engine.all(model),
				options.onAfterAll != null ? options.onAfterAll : [],
				options.onBefore != null ? options.onBefore : [],
				function(req,res,next) {
					res.send(req.response);
					}
				);
			
			// get a single element
			app.get(
				restUrl+'/:id',
				engine.id(model),
				options.onBefore != null ? options.onBefore : [],
				options.onBeforeGet != null ? options.onBeforeGet : [],
				engine.get(model),
				options.onAfterGet != null ? options.onAfterGet : [],
				options.onAfter != null ? options.onAfter : [],
				engine.out(model,options.onOutput),
				options.onResponse != null ? options.onResponse : [],
				function(req,res,next) {
					res.send(req.response);
					}
				);
			// add an element
			app.post(
				restUrl,
				engine.parse(model),
				options.onBefore != null ? options.onBefore : [],
				options.onBeforePost != null ? options.onBeforePost : [],
				engine.post(model),
				options.onAfterPost != null ? options.onAfterPost : [],
				options.onAfter != null ? options.onAfter : [],
				engine.out(model,options.onOutput),
				options.onResponse != null ? options.onResponse : [],
				function(req,res,next) {
					res.send(req.response);
					}				
				);
			// modify an element
			app.put(
				restUrl+'/:id',
				engine.id(model),
				engine.parse(model),
				options.onBefore != null ? options.onBefore : [],
				options.onBeforePut != null ? options.onBeforePut : [],
				engine.get(model),			
				engine.put(model),
				options.onAfterPut != null ? options.onAfterPut : [],
				options.onAfter != null ? options.onAfter : [],
				engine.out(model,options.onOutput),
				options.onResponse != null ? options.onResponse : [],
				function(req,res,next) {
					res.send(req.response);
					}				
				);
			// delete a record	
			app.del(
				restUrl+'/:id',
				engine.id(model),
				options.onBefore != null ? options.onBefore : [],
				options.onBeforeDelete != null ? options.onBefore : [],
				engine.get(model),
				engine.del(model),
				options.onAfterDelete != null ? options.onAfterDelete : [],
				options.onAfter != null ? options.onAfter : [],
				function(req,res,next) {					
					res.response = {error: false};
					return next();
					},
				options.onResponse != null ? options.onResponse : [],
				function(req,res,next) {
					res.send(req.response);
					}				
				);
			
			
			}