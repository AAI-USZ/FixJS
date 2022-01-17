function (EL, uncess) {
            uncess = uncess || 0;
            var newThat = fluid.model.makeTrundler(that.root, config, that.strategies);
            newThat.segs = config.parser? config.parser.parse(EL) : fluid.model.parseEL(EL);
            newThat.index = 0;
            newThat.path = "";
            newThat.step(newThat.segs.length - uncess);
            return newThat;
        }