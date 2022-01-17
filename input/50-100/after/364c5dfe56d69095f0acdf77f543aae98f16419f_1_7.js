function(){return d.isBool(this.effectiveOptions().staticState)?false:(d.isBool(this.owner.options.staticState)?false:d.boolOrDefault(this.effectiveOptions().isDeselectable,true));
}