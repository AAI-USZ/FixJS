function(Memplex) {
        Controller.activeTopnode = Memplex.id;
        
        this.navigation[Memplex.layer - 1] = Memplex;
        View.create(Memplex);
    }