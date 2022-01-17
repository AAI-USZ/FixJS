function(now, fx) {
                // change the appropriate coordinate using .move
                if (fx.prop === "x") {
                    pro.move([now, pro.center[1]]);
                } else {
                    pro.move([pro.center[0], now]);
                }
            }