function(data) {
            message = JSON.stringify({
                user: userId,
                name: name,
                hash: location.hash,
                data: data
            })
            ws.send(message)
        }