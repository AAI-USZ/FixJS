function (connection) {
                if (connection.eventSource) {
                    connection.eventSource.close();
                    connection.eventSource = null;
                }
            }