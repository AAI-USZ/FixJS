function thui_updateInputHeight() {
    var input = this.input;
    var inputCss = window.getComputedStyle(input, null);
    var inputMaxHeight = parseInt(inputCss.getPropertyValue('max-height'));
    if (input.scrollHeight > inputMaxHeight) {
      return;
    }

    input.style.height = null;
    // If the scroll height is smaller than original offset height, we keep
    // offset height to keep original height, otherwise we use scroll height
    // with additional margin for preventing scroll bar.
    input.style.height = input.offsetHeight > input.scrollHeight ?
      input.offsetHeight + 'px' : input.scrollHeight + 8 + 'px';

    var newHeight = input.getBoundingClientRect().height;
    // Add 1 rem to fit the margin top and bottom space.
    var bottomToolbarHeight = (newHeight / Utils.getFontSize() + 1.0) + 'rem';
    var bottomToolbar =
        document.querySelector('.new-sms-form');

    bottomToolbar.style.height = bottomToolbarHeight;

    this.view.style.bottom = bottomToolbarHeight;
    this.scrollViewToBottom();
  }