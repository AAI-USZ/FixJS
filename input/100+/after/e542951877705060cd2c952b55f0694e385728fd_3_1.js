function() {
          var instruments = this.options.collections.instruments,
              time_signatures = this.options.collections.time_signatures;//,
              //granularities = this.options.collections.granularities;


          this.overlayView = new inputOverlayView({model: this.model, collections: this.options.collections});
            
          //console.log('instruments:', instruments);  
          this.instrumentList = new listView({collection: instruments, initial_value: this.model.get('instrument').name });

          //console.log('time_signatures:', time_signatures);  
          this.timeSignatureList = new timeSignatureListView({collection: time_signatures, initial_value: this.model.get('time_signature').upper + '/' + this.model.get('time_signature').lower});
    
          ////console.log('granularity:', granularities);            
          //GranularityList = new listView({collection: granularities});
        
          instruments.on('item:select', this.updateInstrument);
          time_signatures.on('item:select', this.updateTimeSignature);
          //granularities.on('item:select', this.updateGranularity);

          this.model.on('change', this.renderCards);

        }