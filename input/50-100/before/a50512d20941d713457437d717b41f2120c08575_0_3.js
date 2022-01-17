function cleanup() {
          if (iframe) document.body.removeChild(iframe);
          iframe = undefined;
          if (w) w.close();
          w = undefined;
        }