function ($provide, $locationProvider) {
        $provide.decorator('$browser', ['$sniffer', '$delegate', function ($sniffer, $browser) {
            if ($locationProvider.jqmCompatMode()) {
                // Angular should not use the history api and use the hash bang location service,
                // which we will extend below.
                $sniffer.history = false;
                reusejQueryMobileHashChangeForAngular($browser);
            }
            return $browser;
        }]);
    }