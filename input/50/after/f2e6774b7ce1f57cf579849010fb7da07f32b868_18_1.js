function resetMirror(view, transition) {
    var mirror = document.getElementById(view.dataset.mirror);
    mirror.classList.remove(transition.to);
    mirror.classList.add(transition.from);
  }