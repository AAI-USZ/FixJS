function () {
		var $el;
		$el = $( this );
		if ( $el.data( 'runStatus' ) !== 'new' ) {
			$.ajax({
				url: SWARM.conf.web.contextpath + 'api.php',
				type: 'POST',
				data: {
					action: 'wiperun',
					job_id: $el.data( 'jobId' ),
					run_id: $el.data( 'runId' ),
					client_id: $el.data( 'clientId' ),
					useragent_id: $el.data( 'useragentId' )
				},
				dataType: 'json',
				success: function ( data ) {
					if ( data.wiperun && data.wiperun.result === 'ok' ) {
						$el.empty().attr( 'class', 'swarm-status swarm-status-new' );
						refreshTable();
					}
				}
			});
		}
	}