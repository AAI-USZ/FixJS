function ruleEnd(e){

    var selectors ;

    if (e.old === 'ruleStart'){
      selectors = this.get('selectors');
      //delete the last selector
      selectors.pop();
      this.attributes.nest.pop();

      return;
    } else if (e.old === 'valueStart') {
      this._addValue(e);
    }

    ruleEnd.recode = ruleEnd.recode || 0;
    ruleEnd.recode++;
    this.attributes.nest.pop();

    if (!this.attributes.nest.length){
      var num = this.getLen() - ruleEnd.recode;
      ruleEnd.recode = 0;

      this.fire(this.get('RULE_END_EVT'), this.getRule(num));
    }
  }