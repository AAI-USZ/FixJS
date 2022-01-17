function ($injector, $sniffer, $browser) {
            if (jqmCompatMode) {
                // Angular should not use the history api and use the hash bang location service,
                // which we will extend below.
                $sniffer.history = false;

                reusejQueryMobileHashChangeForAngular($browser);

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