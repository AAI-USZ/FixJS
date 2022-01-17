function(element) {
    var b, blueprints, blueprintshtml, buy, buyButton, chance, i, imageUrl, index, itemId, itemName, itembox, listitem, marketprice, name, storeprice, style, _i, _j, _len, _len1, _ref;
    itembox = document.getElementById("itembox");
    itemId = element.id;
    itemName = element.title;
    marketprice = element.getAttribute('data-marketprice').replace(/[{}']/g, '').replace(/, /g, '<br>');
    storeprice = element.getAttribute('data-storeprice');
    imageUrl = element.getAttribute('data-image');
    blueprints = element.getElementsByTagName('ul');
    blueprintshtml = '<div id="blueprint">';
    for (_i = 0, _len = blueprints.length; _i < _len; _i++) {
      b = blueprints[_i];
      chance = b.getAttribute('data-chance');
      blueprintshtml += '<ul style="width:auto;margin:0">';
      _ref = b.getElementsByTagName('li');
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        i = _ref[_j];
        name = i.title;
        index = i.id;
        style = "background-image:url(" + i.innerHTML + ");";
        listitem = "<li title='" + name + "' class='item-small' style='" + style + "'></li>";
        if (index) {
          listitem = ("<a href='/item/" + index + "' target='_blank'>") + listitem + "</a>";
        }
        blueprintshtml = blueprintshtml + listitem;
      }
      blueprintshtml += "<li style='position:relative;top: 13px;margin-left:440px;'><h3>" + chance + "%</h3></li>";
      blueprintshtml += "</ul>";
    }
    blueprintshtml += '</div>';
    if (storeprice) {
      storeprice = "$" + storeprice;
      buyButton = "<form style='position:absolute;bottom:14px;left:320px;'>" + storeprice + "<br><input type='text' value='1' size='1' id='quantity'></form><a href='#' id='buy-button'></a>";
    } else {
      buyButton = '';
    }
    itembox.innerHTML = "<h2>" + itemName + "</h2>    <a class='button' target='_blank' style='position:absolute;bottom:10px;left:10px;' href='http://wiki.teamfortress.com/wiki/" + itemName + "'>Open in Wiki</a>    <h3>" + marketprice + "</h3>    <form name='tf2outpostform' method='POST' action='http://www.tf2outpost.com/search' target='_blank'>      <input type='hidden' name='has1' value='440," + itemId + ",6'>      <input class='button' style='position:absolute;bottom:10px;left:140px;' type='submit' name='submit' value='Find trades'>      <input type='hidden' name='type' value='any'>    </form>    " + buyButton + "    " + blueprintshtml;
    itembox.style.display = "block";
    itembox.style.backgroundImage = "url('" + imageUrl + "')";
    buy = document.getElementById('buy-button');
    if (buy) {
      return buy.onclick = function() {
        var quantity;
        quantity = document.getElementById('quantity').value;
        return window.open("http://store.steampowered.com/buyitem/440/" + itemId + "/" + quantity);
      };
    }
  }