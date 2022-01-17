function ()       {
        return this.currentStage.elementModel.getProperty("offsetHeight") || parseInt(this.currentStage.offsetHeight);
    }