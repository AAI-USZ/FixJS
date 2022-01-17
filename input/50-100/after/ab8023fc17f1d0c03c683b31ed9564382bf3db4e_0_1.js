function() {
        if (!haveTags()) {
          alert("Before you upload your files, you should tag them.")
          return false;
        }
        $('.progress').removeClass('hidden');
        $('.name').hide();
        $('.files').find('.start button').click();
        return true;
      }