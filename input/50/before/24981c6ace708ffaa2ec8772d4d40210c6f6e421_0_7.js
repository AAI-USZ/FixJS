function(params, success, error) {
			if ('id' in params) {
				$.ajax({
					url: '/system/weblounge/pages/' + params.id + '/lock',
					type: 'delete',
					success: success
				});
			}
		}