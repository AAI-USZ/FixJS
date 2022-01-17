function () {
   var element = this.features_.pop(); 
   this.updateLength_();
   return element;
}