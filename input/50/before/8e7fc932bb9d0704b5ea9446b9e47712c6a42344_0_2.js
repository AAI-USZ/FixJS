function(data) {
            message = JSON.stringify({
                user: userId,
			    hash: location.hash,
                data: data
            })
            ws.send(message)
        }