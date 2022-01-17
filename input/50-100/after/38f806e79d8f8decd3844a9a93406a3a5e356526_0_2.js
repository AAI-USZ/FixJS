function(array){
  var oldValues = this.value;
  this.value = array;
  
  this.emit('change', this.get(), 
    new Ivy.ChangeSet()
      .remove(0, oldValues)
      .add(0, array)
  );
  
  return array;
}