function() {
      var dropzone = document.createElement("input");
      dropzone.classList.add("drop-zone");
      dropzone.classList.add("pull-right");
      var self = this;
      dropzone.addEventListener('drop', this.dropAudio, false);
      dropzone.addEventListener('dragover', this.dragOverAudio, false);
      dropzone.setAttribute("placeholder","Drop audio or video files here!");
      $(this.el).html(dropzone);
      return this;
    }