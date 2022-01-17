function() {
        if (!haveTags()) {
          alert("Before you upload your files, you should tag them.")
          return false;
        }
        $('.files').find('.start button').click();
        return true;
      }