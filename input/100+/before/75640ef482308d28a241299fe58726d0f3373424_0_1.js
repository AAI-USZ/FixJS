function() {
      console.log("  _setupPulldowns")
      var alls = this.get('alleles');
      var hidden = this.get('hiddenGenes');
      var staticGenes = this.get('staticGenes');
      var editable = this.get('isEditable');
      for (var i = 0; i < alls.length; i++) {
        if (hidden.indexOf(alls[i].toLowerCase()) == -1) {
          if (editable && staticGenes.indexOf(alls[i].toLowerCase()) == -1){
            this._createPulldown(alls[i], i*30, i);
          } else {
            this._createStaticAllele(alls[i], i*30);
          }
        }
      }
    }