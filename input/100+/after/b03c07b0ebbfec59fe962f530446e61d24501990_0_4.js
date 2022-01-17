function(){
        var employeeTokenOptions = {
            id:"employee",
            el:this.$el.find("#employeeTokenizer"),
            availableItems:this.options.employeeOptions.availableItems,
            selectedItems:this.options.employeeOptions.selectedItems,
            inputSelector:this.options.employeeOptions.inputSelector
        };

        var equipmentTokenOptions = {
            id:"equipment",
            el:this.$el.find("#equipmentTokenizer"),
            availableItems:this.options.equipmentOptions.availableItems,
            selectedItems:this.options.equipmentOptions.selectedItems,
            inputSelector:this.options.equipmentOptions.inputSelector
        };

        this.employeeToken = new KYT.Views.TokenView(employeeTokenOptions);
        this.employeeToken.render();
        this.storeChild(this.employeeToken);

        this.equipmentToken = new KYT.Views.TokenView(equipmentTokenOptions);
        this.equipmentToken.render();
        this.storeChild(this.equipmentToken);
    }