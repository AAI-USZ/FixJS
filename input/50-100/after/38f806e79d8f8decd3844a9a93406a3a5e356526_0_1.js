function(index, item){
  if (arguments.length === 1) return this.replace(index);
  
  var oldValue = this.value[index];
  this.value[index] = item;
  this.emit('change', this.get(), 
    new Ivy.ChangeSet()
      .remove(index, [oldValue])
      .add(index, [item])
  );
  
  return this;
}