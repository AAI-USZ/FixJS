function browser_followLink(e) {
    e.preventDefault();
    if (e.target.nodeName === 'A') {
      this.navigate(e.target.getAttribute('href'));
    }
  }