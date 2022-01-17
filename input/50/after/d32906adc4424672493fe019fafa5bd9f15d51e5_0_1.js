function(error) {
        console.error(error);
        // Tell the printEngine that rendering this canvas/page has failed.
        // This will make the print proces stop.
        if ('abort' in object)
          obj.abort();
        else
          obj.done();
        self.pdfPage.destroy();
      }