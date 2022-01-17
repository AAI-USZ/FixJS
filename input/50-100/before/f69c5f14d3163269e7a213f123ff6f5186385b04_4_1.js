function() {
        assert(this.model.set({
            dependsOnName: undefined
        }));

        this.model.set({name:'name'});

        refute(this.model.set({
            dependsOnName: undefined
        }));
    }