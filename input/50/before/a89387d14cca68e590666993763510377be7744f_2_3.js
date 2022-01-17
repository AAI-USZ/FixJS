function () {
            smtp_client.call_next(constants.ok, smtp_client.response + ' (' + connection.transaction.uuid + ')');
            smtp_client.release();
        }