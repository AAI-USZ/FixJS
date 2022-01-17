function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['query'][$1] = decodeURIComponent($2);
			}
		}