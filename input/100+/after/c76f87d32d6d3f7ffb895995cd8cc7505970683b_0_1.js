function() {
      //http://www.terrillthompson.com/tests/html5-audio.html
      //users must download lame to make mp3 because html5 audio cant play wav? http://lame1.buanzo.com.ar/Lame_Library_v3.98.2_for_Audacity_on_OSX.dmg
      var dropzone = document.createElement("audio");
      if(this.model.get("filename")){
        var sourceaudio = document.createElement("source");
        sourceaudio.setAttribute("src",  "filesystem:" + window.location.origin +"/temporary/"+this.model.get("filename"));
        sourceaudio.setAttribute("type", "audio/"+this.model.get("filename").split('.').pop() );
        dropzone.appendChild(sourceaudio);
        dropzone.setAttribute("preload","");
      }
      dropzone.setAttribute("controls", "");
//      dropzone.setAttribute("tabindex","0"); //needed to play it using tab, this puts it first...
      dropzone.setAttribute("id", "playerdatums");
//      dropzone.setAttribute("loop", "true");
//      dropzone.classList.add("drop-zone");
//      dropzone.classList.add("pull-right");
      dropzone.classList.add("datum-audio-player");
      dropzone.addEventListener('drop', this.dropAudio, false);
      dropzone.addEventListener('dragover', this.dragOverAudio, false);
      $(this.el).html(dropzone);
      return this;
    }