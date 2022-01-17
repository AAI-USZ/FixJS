function th_touchStart(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var state = this.state;

        var currentLetter = evt.target.textContent;

        if (evt.target.nodeName === letterElemType &&
            currentLetter && currentLetter !== state.letter) {
          state.letter = currentLetter;
          var groupContainer = doc.querySelector(prefixGroup + currentLetter);
          if (groupContainer && groupContainer.clientHeight > 0) {
            currentLetterAbbr.textContent = currentLetter;
            currentLetterClassList.remove("hide");
            clearTimeout(state.timeout);
            lContacts.scrollTop = groupContainer.offsetTop;
            state.timeout = setTimeout(function() {
              currentLetterClassList.add("hide");
            }, 3000);
          }
        }
      }