function(self) {
            self.running = false;

            //start before calling back so the callbacks have the ability to stop the cron job
            if (!(self.runOnce)) self.start();;

            self._callback();
          }