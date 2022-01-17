function() {
        this.model.set({name:'aaa'});

        assert(this.model.set({
            dependsOnName: undefined
        }));

        this.model.set({name:'name'});

        refute(this.model.set({
            dependsOnName: undefined
        }));
    }