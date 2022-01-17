function (path, parser, node, callback2) {

			ASSERT(alreadyParsed[path] === undefined);



			alreadyParsed[path] = {

				parsing: true,

				callbacks: [ callback2 ]

			};



			parser(node, function (err, meta) {

				ASSERT(!err || meta === undefined);

				ASSERT(alreadyParsed[path].parsing);



				var callbacks = alreadyParsed[path].callbacks;

				ASSERT(callbacks.length >= 1);



				if( err ) {

					delete alreadyParsed[path];

				}

				else {

					alreadyParsed[path] = meta;

				}



				for( var i = 0; i < callbacks.length; ++i ) {

					callbacks[i](err, meta);

				}

			});

		}