function callCallbacks(cb, err) {
					//call all callbacks
					for(var i = 0; i < cb.length; i++)
					{
						if(err)
							cb[i](err);
						else
							cb[i](null, cachedViews[filename]);
					}
				}