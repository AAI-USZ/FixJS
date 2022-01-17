function(evt){
		var x = evt.offsetX;
		var y = evt.offsetY;
		
		console.debug(x + ',' + y + ' :: ' + vwr.labelWidth + ', 20') ;
		
		if(x > vwr.labelWidth && y > 23)
		{
			var t = y/23;
			t = t - (t%1) -1;
			if(t >= vwr.trackIndex.length) return;
			console.debug('track ' + t + ' :: ' + vwr.trackIndex[t]);
			
			/*var b = x - vwr.labelWidth;
			b = b / vwr.baseWidth;
			b = b - (b%1);
			b = b + vwr.offset;
			console.debug('base ' + b);*/
			var b = vwr.getBase();
			
			var f = null; var fi = null;
			
			var t = y/23;
			t = t - (t%1) -1;
			
			var features = vwr.tracks[vwr.trackIndex[t]].features;
			var count = features.length;
			for(var i = count; i--; )
			{
				if(b >= features[i].s && b <= features[i].e)
				{
					console.debug('feature : ' + features[i].n);
					f = features[i];
					fi = i;
					break;
				}
			}
			//console.debug('no feature');
			
			vwr.selectedFeature = [vwr.trackIndex[t], fi];
/**
 * @name Viewer#trackClicked
 * @event
 * @memberOf BRAGV
 * @param {Object} track, base, feature,	 featureIndex
 */			
			div.trigger({
					type: 'trackClicked', 
					track : t+1,
					base : b,
					feature : f,
					featureIndex : fi
				});
			
			test.draw();
		}
	}