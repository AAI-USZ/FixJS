function(e) {
      var slide = Number(location.hash.replace('#slide-', ''));
      switch (e.keyName) {
        case 'alt+right':
          return nko.goTo('#slide-' + ++slide);
        case 'alt+left':
          return nko.goTo('#slide-' + --slide);
      }

      if (e.altKey || e.ctrlKey || e.metaKey) return true;
      switch (e.keyName) {
        case 'meta':
        case 'meta+ctrl':
        case 'ctrl':
        case 'alt':
        case 'shift':
        case 'up':
        case 'down':
        case 'left':
        case 'right':
          return;
        default:
          $text.focus()
      }
    }