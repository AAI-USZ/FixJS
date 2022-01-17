function () {
    comb.serial([
        function () {
            return State.order("name").forEach(function (state) {
                //if you return a promise here it will prevent the foreach from
                //resolving until all inner processing has finished.
                return state.capital.then(function (capital) {
                    console.log(comb.string.format("%s's capital is %s.", state.name, capital.name));
                });
            });
        },
        function () {
            return Capital.order("name").forEach(function (capital) {
                //if you return a promise here it will prevent the foreach from
                //resolving until all inner processing has finished.
                return capital.state.then(function (state) {
                    console.log(comb.string.format("%s is the capital of %s.", capital.name, state.name));
                });
            });
        }
    ]).then(disconnect, disconnectError);
}