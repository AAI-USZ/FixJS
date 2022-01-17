function ($locationProvider) {
        var jqmCompatMode = true;
        /**
         * @ngdoc property
         * @name ng.$locationProvider#jqmCompatMode
         * @methodOf ng.$locationProvider
         * @description
         * @param {string=} mode Use jqm compatibility mode for navigation.
         * @returns {*} current value if used as getter or itself (chaining) if used as setter
         */
        $locationProvider.jqmCompatMode = function (mode) {
            if (angular.isDefined(mode)) {
                jqmCompatMode = mode;
                return this;
            } else {
                return jqmCompatMode;
            }
        };

        var _$get = $locationProvider.$get;
        $locationProvider.$get = ['$injector', '$sniffer', '$browser', function ($injector, $sniffer, $browser) {
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
        }];

    }