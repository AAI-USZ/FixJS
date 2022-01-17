function km_showCandidates(candidates, noWindowHeightUpdate) {
    this.ime = document.getElementById('keyboard');
    var ime = this.ime;
    // TODO: Save the element
    var candidatePanel = document.getElementById('keyboard-candidate-panel');
    var isFullView = this.ime.classList.contains('full-candidate-panel');

    candidatePanel.innerHTML = '';

    if (!candidates.length) {
      ime.classList.remove('candidate-panel');
      ime.classList.remove('full-candidate-panel');
      // if (!noWindowHeightUpdate)
      //   updateTargetWindowHeight();
      return;
    }

    if (!isFullView) {
      ime.classList.add('candidate-panel');
    }

    candidatePanel.scrollTop = candidatePanel.scrollLeft = 0;

    // if (!noWindowHeightUpdate)
    //   updateTargetWindowHeight();

    // If there were too many candidate
    delete candidatePanel.dataset.truncated;
    if (candidates.length > 74) {
      candidates = candidates.slice(0, 74);
      candidatePanel.dataset.truncated = true;
    }

    candidates.forEach(function buildCandidateEntry(candidate) {
      var span = document.createElement('span');
      span.dataset.data = candidate[1];
      span.dataset.selection = true;
      span.textContent = candidate[0];
      candidatePanel.appendChild(span);
    });
  }