function(context,channel) {
   var that = this;
   this.context = context;
   this.node = this.context.createJavaScriptNode(256, 10, 10);
   this.node.onaudioprocess = function(e) { that.process(e) };
   this.channel = channel;
   this.frequency = 440;
   this.next_frequency = 440;
   this.amplitude = 1;
   this.sample_rate = 44100;
   this.x = 0;
   this.on = false;
}