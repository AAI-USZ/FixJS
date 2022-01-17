function ( e, type ) {
			                                          type ? util.getRemoteFile( e.data.uri, type ) : util.getRemotePage( e.data.uri );
			                                      }