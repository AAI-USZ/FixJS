function(){
                if(App.Settings.Debug.enabled) {
                    console.warn('Error loading module ' + name);
                }
                d.reject();
            }