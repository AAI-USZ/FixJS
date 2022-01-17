function ( e, type ) {
			                                          type ? util.getRemoteFile( e.uri, type ) : util.getRemotePage( e.data.uri );
			                                      }