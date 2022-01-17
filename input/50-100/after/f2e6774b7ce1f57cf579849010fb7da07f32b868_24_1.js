function cs_transitionNextLoop() {
        CallScreen.screen.classList.add('animate');
        CallScreen.screen.classList.toggle('displayed');
        CallScreen.screen.classList.toggle('prerender');

        CallScreen.screen.addEventListener('transitionend', function trWait() {
          CallScreen.screen.removeEventListener('transitionend', trWait);

          // We did animate the call screen off the viewport
          // now closing the window.
          if (displayed)
            window.close();
        });
      }