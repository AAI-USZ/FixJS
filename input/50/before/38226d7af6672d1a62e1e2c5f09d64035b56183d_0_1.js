function() {
                setSettings(json.initialState);
                checkSettings(json.initialState);
                setTimeout(function() {
                    jqUnit.start();
                }, 10);
            }