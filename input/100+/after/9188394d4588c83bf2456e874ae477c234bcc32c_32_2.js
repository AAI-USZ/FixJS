function ns_addNotification(detail) {
    var notificationNode = document.createElement('div');
    notificationNode.className = 'notification';

    notificationNode.dataset.notificationID = detail.id;

    if (detail.icon) {
      var icon = document.createElement('img');
      icon.src = detail.icon;
      notificationNode.appendChild(icon);

      this.toasterIcon.src = detail.icon;
    }

    var title = document.createElement('div');
    title.textContent = detail.title;
    notificationNode.appendChild(title);

    this.toasterTitle.textContent = detail.title;

    var message = document.createElement('div');
    message.classList.add('detail');
    message.textContent = detail.text;
    notificationNode.appendChild(message);

    this.toasterDetail.textContent = detail.text;

    this.container.appendChild(notificationNode);
    new GestureDetector(notificationNode).startDetecting();

    // Notification toast
    this.toaster.dataset.notificationID = detail.id;

    this.toaster.classList.add('displayed');
    this._toasterGD.startDetecting();

    if (this._toasterTimeout)
      clearTimeout(this._toasterTimeout);

    this._toasterTimeout = setTimeout((function() {
      this.toaster.classList.remove('displayed');
      this._toasterTimeout = null;
      this._toasterGD.stopDetecting();
    }).bind(this), this.TOASTER_TIMEOUT);

    this.updateStatusBarIcon(true);
  }