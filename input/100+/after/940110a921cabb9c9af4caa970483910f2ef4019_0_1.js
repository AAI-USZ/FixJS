function Box(property, value){
  this.property = property;
  this.value = value;
  this.width = 0;
  this.height = 0;
  this.hasWidth = false;
  this.hasHeight = false;

  this.background = {};
  //设置行高
  this.EM = 0;

  this.setEM();

  property.forEach(this.getProp, this);

  if (!this.background.repeat)  this.background.repeat = 'no-repeat';
  if (!this.hasWidth) this.width = 0;
  if (!this.hasHeight) this.height = 0;
}