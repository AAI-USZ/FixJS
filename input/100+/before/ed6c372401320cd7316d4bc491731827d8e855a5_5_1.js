function() {
        if (FaultedEarth.TraceForm.superclass.deactivate.apply(this, arguments)) {
            this.target.tools[this.featureManager].featureStore.un("save", this.monitorSave, this);
        }
    }