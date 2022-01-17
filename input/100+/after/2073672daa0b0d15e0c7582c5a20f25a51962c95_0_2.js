function () {
			$wipejobErr.hide();
			$.ajax({
				url: SWARM.conf.web.contextpath + 'api.php',
				type: 'POST',
				data: {
					action: 'wipejob',
					job_id: SWARM.jobInfo.id,
					type: 'delete',
					authUsername: SWARM.user.name,
					authToken: SWARM.user.authToken
				},
				dataType: 'json',
				success: function ( data ) {
					if ( data.wipejob && data.wipejob.result === 'ok' ) {
						// Right now the only user authorized to delete a job is the creator,
						// the below code makes that assumption.
						window.location.href = SWARM.conf.web.contextpath + 'user/' + SWARM.session.username;
						return;
					}
					wipejobFail( data );
				},
				error: wipejobFail
			});
		}