function SafetyNet(options) {
      this.options = options != null ? options : {};
      this.pendingRequests = JSON.parse(localStorage.getItem('offline-backups') || '[]');
      window.addEventListener('online', this.submitPendingRequests);
    }