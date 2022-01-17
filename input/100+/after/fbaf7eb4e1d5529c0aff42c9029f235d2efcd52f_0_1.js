function(e) {
   var data = e.outputBuffer.getChannelData(this.channel);
   for (var i = 0; i < data.length; ++i) {
      data[i] = this.amplitude * Math.sin(this.x++ /
            (this.sample_rate / (2 * Math.PI * this.frequency)));
      
      if (this.next_frequency != this.frequency) {
         next_data = this.amplitude * Math.sin(
               this.x / (this.sample_rate / (2 * Math.PI * this.frequency)));
         if (data[i] < 0.001 && data[i] > -0.001 && data[i] < next_data) {
            this.frequency = this.next_frequency;
            this.x = 0;
         }
      }
   }
}