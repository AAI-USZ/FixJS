function () {
            if (!that.root) {
                return;
            }
            var accepted;
            for (var i = 0; i < that.strategies.length; ++i) {
                var value = fluid.model.applyStrategy(that.strategies[i], that.root, that.segs[that.index], that.index);
                if (accepted === undefined) {
                    accepted = value;
                }
            }
            if (accepted === fluid.NO_VALUE) {
                accepted = undefined;
            }
            that.root = accepted;
            ++that.index;
        }