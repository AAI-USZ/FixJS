function(model){
      var cid = model.cid;
      this.contractedViews[cid].off();
      this.contractedViews[cid].remove();
      delete this.expandedViews[cid];

      this.expandedViews[cid].off();
      this.expandedViews[cid].remove();
      delete this.contractedViews[cid];

      BTS.SortableTable.prototype.remove.call(this, model);
    }