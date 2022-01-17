function() {
        if (svg && isRenderRequested && isCollectionLoaded && areFontsLoaded) {
          isRenderRequested = false;
          if (doc.length) {

Util.profileClear();
Util.profileStart('before render');

            renderDocument();
          } else {
            dispatcher.post(0, 'renderError:noFileSpecified');
          }
        }
      }