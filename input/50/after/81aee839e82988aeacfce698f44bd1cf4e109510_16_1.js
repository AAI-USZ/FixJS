function(err, html) {
    if (err) {
      console.log(err);
    } else {
      $('#view-root').html(html);
    }
  }