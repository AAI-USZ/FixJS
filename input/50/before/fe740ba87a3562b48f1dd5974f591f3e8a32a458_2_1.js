function (error) {
            if (error.code === 0 || error.code === 404) {
                startServices(function () {
                    doBuild();
                });
            }
        }