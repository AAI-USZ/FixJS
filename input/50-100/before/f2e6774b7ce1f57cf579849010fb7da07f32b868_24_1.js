function cs_transitionNextLoop() {
        callScreen.classList.add('animate');
        callScreen.classList.toggle('displayed');
        callScreen.classList.toggle('prerender');

        callScreen.addEventListener('transitionend', function trWait() {
          callScreen.removeEventListener('transitionend', trWait);

          // We did animate the call screen off the viewport
          // now closing the window.
          if (displayed)
            window.close();
        });
      }