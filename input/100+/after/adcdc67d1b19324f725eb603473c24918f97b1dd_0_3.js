function findOutlinesAndUnreferencedSources(rows)
		{
			var profiles = [];
			var sourceGuids = [];
			var sources = [];
			for (var i=0; i < rows.length; ++i) {
				var doc = rows[i].value;
				if (!doc)
					continue;
				if (doc.head.contentType == "chiasm" || 
					doc.head.contentType == "outline" || 
					doc.head.contentType == "panel" )
				{
					profiles.push(doc);
					if (doc.head.source && doc.head.source.guid)
					{
						sourceGuids[doc.head.source.guid] = true;	
					}
				}
				if (doc.head.contentType == "sourceProfile")
				{
					sources.push(doc);
				}
			}
			for (var isource=0; isource < sources.length; ++isource)
			{
				var source = sources[isource];
				if (!sourceGuids[source._id])
				{
					profiles.push(source);
				}
			}
			return profiles;			
		}