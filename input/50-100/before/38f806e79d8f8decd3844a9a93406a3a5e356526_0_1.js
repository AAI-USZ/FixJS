function(index, item){
  if (arguments.length === 1) return this.replace(items);
  
  var oldValue = this.value[index];
  this.value[index] = item;
  this.emit('change', this.get(), 
    new Ivy.ChangeSet()
      .remove(index, [oldValue])
      .add(index, [value])
  );
  
  return this;
}