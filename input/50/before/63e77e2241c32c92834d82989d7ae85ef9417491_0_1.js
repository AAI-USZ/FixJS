function browser_followLink(e) {
    e.preventDefault();
    this.navigate(e.target.getAttribute('href'));
  }