function Env(bindings, parents, inmutable) {

        if (bindings === undefined) {
            bindings = {};
        }

        if (parents === undefined) {
            parents = [];
        }

        this.parents = parents;
        this.bindings = bindings;
        this.inmutable = (inmutable === true);
    }