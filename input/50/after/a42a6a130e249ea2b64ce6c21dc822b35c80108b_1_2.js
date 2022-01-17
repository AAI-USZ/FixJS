function (resp) {
			if (resp.data && resp.data.message && resp.data.message === 'Not Found') {
				return [];
			}
			return resp.data;
		}