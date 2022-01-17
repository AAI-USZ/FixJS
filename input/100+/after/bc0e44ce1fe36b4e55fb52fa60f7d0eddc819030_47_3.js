function kh_addEllipsis(view, fakeView, currentFontSize) {
    var viewWidth = view.getBoundingClientRect().width;
    fakeView.style.fontSize = currentFontSize + 'px';
    fakeView.innerHTML = view.value;

    var counter = 1;
    var value = view.value;

    var newPhoneNumber;
    while (fakeView.getBoundingClientRect().width > viewWidth) {
      newPhoneNumber = '\u2026' + value.substr(-value.length + counter);
      fakeView.innerHTML = newPhoneNumber;
      counter++;
    }

    if (newPhoneNumber) {
      view.value = newPhoneNumber;
    }
  }