function(err, html) {
  console.log(model);
    if (err) {
      console.log(err);
    } else {
      $('#view-root').html(html);
    }
  }