function (i)
        {
            $.getScript(appPartsLocation + appParts[i] + '.js')
            .done(function () {
                if(i < appParts.length - 1)
                    prepareApp(++i);
                else {
                    App.Modules.LoadModulesByScheme();
                    appIsBuilt = true;
                }
            })
            .fail(function () {
                console.warn('Error: ' + appPartsLocation + appParts[i] + '.js');
            });
        }