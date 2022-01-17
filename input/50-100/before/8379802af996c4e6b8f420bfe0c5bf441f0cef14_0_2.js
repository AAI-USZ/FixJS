function(err, response) {
				tick();
				if(err) throw err;
				if(response.labels.length > 0) {					
					card.label = response.labels[0].name;
				}
				var featureArea = response.desc.match('FeatureArea:(.*)');
				card.feature_area = featureArea ? featureArea[1] : '';
				callback2(null);
			}