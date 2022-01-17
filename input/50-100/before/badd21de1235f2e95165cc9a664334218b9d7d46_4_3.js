function cs_transitionNextLoop() {
        self.screen.classList.add('animate');
        self.screen.classList.toggle('displayed');
        self.screen.classList.toggle('prerender');

        self.screen.addEventListener('transitionend', function trWait() {
          self.screen.removeEventListener('transitionend', trWait);

          // We did animate the call screen off the viewport
          // now closing the window.
          if (displayed)
            window.close();
        });
      }