function(label, fingerprint, cacheInfo) {
			if(arguments.length > 1)
			{
				//Add a label
				var labelInfo = labels[label] = {"fingerprint": fingerprint};
				for(var i in cacheInfo)
					labelInfo[i] = cacheInfo[i];
			}
			else
			{
				//Get a fingerprint
				var info = labels[label];
				if(info)
				{
					var headers = {};
					if(info.etag)
						headers["ETag"] = info.etag;
					if(info.lastModified)
						headers["Last-Modified"] = info.lastModified.getUTCString();
					if(info.expires !== null)
					{
						if(!info.expires)
						{
							var d = info.expires = new Date();
							d.setFullYear(d.getFullYear() + 1);
						}
						headers["Expires"] = info.expires.getUTCString();
					}
					return addFingerprint(info.fingerprint, headers);
				}
				else
				{
					var filename = path.resolve(rootPath + "/" + (label || req.url) );
					//Use the "cache strategy" to get a fingerprint
					//Prefer the use of etag over lastModified when generating
					//fingerprints
					var expires = cacheStrategy.expires ||
						staticAsset.strategies["default"].expires;
					var headers = {
						"Expires": expires(filename).getUTCString()
					};
					if(cacheStrategy.etag)
					{
						var etag = cacheStrategy.etag(filename);
						headers["ETag"] = etag;
						return addFingerprint(label + "?v=" + etag,	headers);
					}
					else if(cacheStrategy.lastModified)
					{
						var mdate = cacheStrategy.lastModified(filename);
						mdate.setMilliseconds(0);
						headers["Last-Modified"] = mdate.toUTCString();
						//Encode the Date as a radix 36 UTC timestamp
						mdate = new Number(mdate.getTime() / 1000).toString(36);
						return addFingerprint(label + "?v=" + mdate, headers);
					}
					else
						return label; //Do not generate a fingerprint
				}
			}
		}