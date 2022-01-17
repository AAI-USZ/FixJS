function(){
	if(this.prepared) return;
	this.prepared = true;
	var s = this;
	//console.log('preparing object: ' + this.typeSchema.name + ' ' + JSON.stringify(this.typeSchema))
	_.each(this.typeSchema.properties, function(p, name){
		if(p.type.type !== 'object' || s.hasProperty(name)){
			if(s.isReadonlyAndEmpty){
				//console.log('defining getter')
				s.__defineGetter__(name, emptyReadonlyObjectProperty);
			}else{
				var v = s.property(name);
				s[name] = v;
				//console.log('prepared: ' + name)
				v.prepare();
			}
		}
	});
}