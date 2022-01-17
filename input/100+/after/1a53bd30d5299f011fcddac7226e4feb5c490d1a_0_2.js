function(fact) {
      var $factsBar;
      $factsBar = $('<table>', {
        id: 'draco-interesting-facts123'
      }).append('<tbody>').append('<tr>');
      $('<td>', {
        id: 'draco-interesting-facts-share'
      }).appendTo($factsBar.find('tr'));
      $('<iframe>').appendTo($factsBar.find('#draco-interesting-facts-share'));
      $('<td>', {
        id: 'draco-interesting-facts-fact123'
      }).appendTo($factsBar.find('tr'));
      $('<td>', {
        id: 'draco-interesting-facts-close123'
      }).appendTo($factsBar.find('tr'));
      $factsBar.find('#draco-interesting-facts-close123').text('×');
      $factsBar.find('#draco-interesting-facts-fact123').html(fact.content);
      $factsBar.find('#draco-interesting-facts-share iframe').attr("src", "" + this.shareURL + "/" + fact.id);
      window.addEventListener('message', this.handleShareMessage, false);
      $factsBar.find('#draco-interesting-facts-close123').click(function() {
        return $factsBar.remove();
      });
      $('html:first').prepend($factsBar);
      $factsBar.find('#draco-interesting-facts-share').tooltip({
        title: "Share Fact",
        placement: 'right'
      });
      return $factsBar;
    }