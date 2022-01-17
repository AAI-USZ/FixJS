function (data) {
				if (data) {

					if (data.errorcode === 0) {
						alert('OK OK REFRESH NOW');
					}
					else{
						alert(data.message);
					}

				}

				else {
					alert('CANNOT CONNECT TO DATABASE');


				}

			}