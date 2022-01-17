function() {
                reader.onloadend = reader.onerror = null;
                // Chrome (Linux/Win), Firefox (Linux/Mac), Opera 12.01 (Linux/Mac/Win)
                callback(false);
            }