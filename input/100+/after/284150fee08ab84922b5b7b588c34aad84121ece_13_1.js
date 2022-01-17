function(contentOptions){
        if(pvc.debug >= 3){
            pvc.log("Prerendering in data-tree");
        }
        
        // Create DataEngine
        var structEngine  = this.structEngine;
        var structType    = structEngine ? structEngine.type : new pvc.data.ComplexType();
        // Force the value dimension not to be a number
        structType.addDimension('value', {});
        
        var translOptions = {
            seriesInRows: true,
            crosstabMode: true
        };
        
        var translation = new pvc.data.CrosstabTranslationOper(structType, this.structDataset, this.structMetadata, translOptions);
        translation.configureType();
        if(!structEngine) {
            structEngine = this.structEngine = new pvc.data.Data({type: structType});
        }
        
        structEngine.load(translation.execute(structEngine));

        if(pvc.debug >= 3){
            pvc.log(this.structEngine.getInfo());
        }

        // ------------------
        
        this.dataTreePanel = new pvc.DataTreePanel(this, this.basePanel, def.create(contentOptions, {
            topRuleOffset : this.options.topRuleOffset,
            botRuleOffset : this.options.botRuleOffset,
            leftRuleOffset : this.options.leftRuleOffset,
            rightRuleOffset : this.options.rightRuleOffset,
            boxplotColor:  this.options.boxplotColor,
            valueFontsize: this.options.valueFontsize,
            headerFontsize: this.options.headerFontsize,
            border: this.options.border,
            perpConnector: this.options.perpConnector,
            numDigits: this.options.numDigits,
            minVerticalSpace: this.options.minVerticalSpace,
            connectorSpace: this.options.connectorSpace,
            minAspectRatio: this.options.minAspectRatio
        }));
    }