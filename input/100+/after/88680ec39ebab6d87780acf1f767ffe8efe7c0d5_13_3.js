function(textbox) {

  var keyword = this.createKeyword(textbox.value);

  if (keyword == '') {

    eXo.wiki.UIWikiSearchBox.hideMenu();

    return;

  }

  var url = this.restURL + keyword;  

  // Create loading

  var me = eXo.wiki.UIWikiSearchBox;

  var searchBox = gj(this.input).closest(".UIWikiSearchBox")[0];

  this.searchPopup = gj(searchBox).find("div.SearchPopup")[0];

  this.searchPopup.style.display = "block";

  this.searchPopup.onmouseup = function(evt) {

    this.style.display = "none";

  }

  this.menu = gj(this.searchPopup).find("div.SubBlock")[0];

  this.menu.innerHTML = "";



  var textNode = document.createTextNode('');

  this.menu.appendChild(textNode);

  var searchItemNode = document.createElement('div');

  searchItemNode.className = 'MenuItem Horizon';

  var searchText = document.createElement('div');

  searchText.className = 'MenuText';

  var linkNode = document.createElement("a");

  linkNode.className = 'ItemIcon MenuIcon';

  linkNode.innerHTML = me.loading;

  searchText.appendChild(linkNode);  

  searchItemNode.appendChild(searchText);  

  this.menu.insertBefore(searchItemNode, textNode);

  me.shortenWord(linkNode, searchText); 



  this.makeRequest(url, this.typeCallback);

  this.menu.removeChild(this.menu.lastChild);

}