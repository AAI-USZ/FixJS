function(frame){
					var c = _.isNull(frame.get('layers')) ? 0 : frame.get('layers').length;
					frame.loader = new loaderView({count: c });
				}