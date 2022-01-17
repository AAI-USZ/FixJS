function() {
      dust.loadSource(dust.compile(this.innerText, this.getAttribute('data-name')));
    }