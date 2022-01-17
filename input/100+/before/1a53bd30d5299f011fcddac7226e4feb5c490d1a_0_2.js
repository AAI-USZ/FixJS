function(fact) {
      var $factsBar;
      $factsBar = $('<table id="draco-interesting-facts123">\n<tbody>\n  <tr>\n    <td id="draco-interesting-facts-share">\n      <iframe src=""></iframe>\n    </td>\n    <td id="draco-interesting-facts-fact123">\n    </td>\n    <td id="draco-interesting-facts-close123">\n      &times;\n    </td>\n  </tr>\n</tbody>\n</table>');
      console.log($factsBar);
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