function rehide() {
        var newVal = splitLines(input.value).join("\n");
        if (newVal != val) operation(replaceSelection)(newVal, "end");
        inputDiv.style.position = "relative";
        input.style.cssText = oldCSS;
        if (ie_lt9) scroller.scrollTop = scrollPos;
        leaveInputAlone = false;
        resetInput(true);
        slowPoll();
      }