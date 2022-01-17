function () {
            smtp_client.call_next(OK, smtp_client.response + ' (' + connection.transaction.uuid + ')');
            smtp_client.release();
            delete connection.notes.smtp_client;
        }