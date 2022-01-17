function ()        {
        return this.currentStage.elementModel.getProperty("offsetWidth") || parseInt(this.currentStage.offsetWidth);
    }