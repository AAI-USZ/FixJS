function Placeholder(el, cfg) {

        if(isSupport) return;



        var self = this;

        var defaultCfg = {

            wrap:true

        };



        if(self instanceof Placeholder) {

            var config = Y.merge(defaultCfg, cfg);

            self._init(el, config);

            return;

        }



        return new Placeholder(el, cfg);

    }