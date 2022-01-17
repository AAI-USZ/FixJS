function SafetyNet(options) {
      var eventer;
      this.options = options != null ? options : {};
      this.pendingRequests = JSON.parse(localStorage.getItem('offline-backups') || '[]');
      eventer = window[window.addEventListener ? "addEventListener" : "attachEvent"];
      eventer('online', this.submitPendingRequests);
    }