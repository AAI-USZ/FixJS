function() {
      this.pfd.setAttitude(this.attitude.get('pitch'),
                           this.attitude.get('roll'));
      this.pfd.draw();
    }