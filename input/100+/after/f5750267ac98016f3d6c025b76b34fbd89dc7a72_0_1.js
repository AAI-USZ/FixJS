function() {
    var a, downloadLink, proxyUrl;
    downloadLink = $('a.download').attr('href');
    console.log(downloadLink); //is downloadlink empty?
    a = $('<a />');
    a.href = downloadLink;
    proxyUrl = a.pathname;
    return $.ajax({
      url: proxyUrl,
      type: "HEAD",
      cache: false,
      error: function(xhr, status, err) {
        if (status !== "Unknown") {
          setTimeout(checkPdfUrl, 1000);
        }
        if (status === "Unknown") {
          return setTimeout(function() {
            $('#waiting').hide();
            return $('#download').show();
          }, 2000);
        }
      },
      success: function(d) {
        window.ellipsis.stop();
        return $('#waiting').fadeOut(function() {
          return $('#download').fadeIn();
        });
      }
    });
  }