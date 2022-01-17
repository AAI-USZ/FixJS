function(key){var cache=this.cache[key]||null;if(cache){if(!cache.view)
cache.view=cache.call.apply(cache.context,arguments);return cache.view;}
else{return new joView("View not found: "+key);}}