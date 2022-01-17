function parseUri( url, strictMode )
	{
		var str = url,
		    res   = parser[ strictMode || false ? "strict" : "loose" ].exec( str ),
		    uri = { attr : {}, param : {}, seg : {} },
		    i   = 14;
		
		while ( i-- )
		{
			uri.attr[ key[i] ] = res[i] || "";
		}
		
		// build query and fragment parameters
		
		uri.param['query'] = {};
		uri.param['fragment'] = {};
		
		uri.attr['query'].replace( querystring_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['query'][$1] = decodeURIComponent($2);
			}
		});
		
		uri.attr['fragment'].replace( fragment_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['fragment'][$1] = decodeURIComponent($2);
			}
		});
				
		// split path and fragement into segments
		
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/').map(function(part) {return decodeURIComponent(part);});
        
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/').map(function(part) {return decodeURIComponent(part);});
        
        uri.attr.host = uri.attr.host ? decodeURI(uri.attr.host) : ''; // International URLs

        // compile a 'base' domain attribute
        
        uri.attr['base'] = uri.attr.host ? uri.attr.protocol+"://"+uri.attr.host + (uri.attr.port ? ":"+uri.attr.port : '') : '';
        
		return uri;
	}