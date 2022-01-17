function (connection) {
                if (connection && connection.eventSource) {
                    connection.eventSource.close();
                    connection.eventSource = null;
                }
            }