function ($injector, $browser) {
            if (jqmCompatMode) {
                var $location = $injector.invoke(_$get, $locationProvider);
                patchLocationServiceToUsePlainUrls($location, $browser.url());

                return $location;
            } else {
                // deactivate jqm hash listening and changing
                $.mobile.pushStateEnabled = false;
                $.mobile.hashListeningEnabled = false;
                $.mobile.changePage.defaults.changeHash = false;

                return $injector.invoke(_$get, $locationProvider);
            }
        }