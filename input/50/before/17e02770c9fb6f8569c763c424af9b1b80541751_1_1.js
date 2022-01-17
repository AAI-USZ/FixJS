function() {
        tributary.clear();
        delete tributary.nodes;
        tributary.init(tributary.ctx);
        tributary.execute();
    }