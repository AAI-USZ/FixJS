function() {
   var that = this;
   this.context = new webkitAudioContext();
   this.node = this.context.createJavaScriptNode(256, 1, 1);
   this.node.onaudioprocess = function(e) { that.process(e) };
   
   this.frequency = 440;
   this.next_frequency = 440;
   this.amplitude = 1;
   this.sample_rate = 44100;
   this.x = 0;
   this.on = false;
}