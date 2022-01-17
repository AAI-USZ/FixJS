function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
  if (this.initialized) {
    this.refreshAccounts();
  }
}