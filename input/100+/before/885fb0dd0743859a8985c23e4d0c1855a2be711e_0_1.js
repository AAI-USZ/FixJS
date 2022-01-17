function clearContent() {
          // ignore callback if another route change occured since
          if (thisChangeId === changeCounter) {
            element.html('');
            destroyLastScope();
          }
        }