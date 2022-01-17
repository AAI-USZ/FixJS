function(){
                if(App.Settings.Debug.enabled) {
                    console.error('Error loading module ' + name);
                }
                d.reject();
            }