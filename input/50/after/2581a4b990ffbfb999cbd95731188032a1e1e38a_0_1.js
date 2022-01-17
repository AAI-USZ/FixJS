function (v, axis) {
                    var factor = Math.pow(10, axis.tickDecimals);
                    return Math.round(v * factor) / factor;
                }