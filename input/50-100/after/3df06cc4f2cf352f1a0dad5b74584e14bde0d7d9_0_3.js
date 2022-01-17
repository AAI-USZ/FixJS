function( error, data ){
				if ( error ){
					console.log("[NotificationAction.setupCourseMaterialNotifiers] error - "+error);
					callback( null, new Array());
					return;
				} else {
					addedStudents.push( data );
					callback(null, data );
				}
			}