function onDragStart(e) {
      var txt = getSelection();
      e.dataTransfer.setData("Text", txt);
      
      // Use dummy image instead of default browsers image.
      if (gecko || chrome) {
        var img = document.createElement('img');
        img.scr = 'data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs='; //1x1 image
        e.dataTransfer.setDragImage(img, 0, 0);
      }
    }