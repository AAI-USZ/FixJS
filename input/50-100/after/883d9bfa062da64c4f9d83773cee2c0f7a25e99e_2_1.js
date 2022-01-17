function() {
        if (svg && ((isRenderRequested && isCollectionLoaded) || requestedData) && Visualizer.areFontsLoaded) {
          isRenderRequested = false;
          if (requestedData) {

Util.profileClear();
Util.profileStart('before render');

            renderData(requestedData);
          } else if (doc.length) {

Util.profileClear();
Util.profileStart('before render');

            renderDocument();
          } else {
            dispatcher.post(0, 'renderError:noFileSpecified');
          }
        }
      }