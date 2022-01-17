function()
{
    this.element = document.getElementById("search");
    this._matchesElement = document.getElementById("search-results-matches");
    this._searchItemElement = document.getElementById("toolbar-search-item");
    this._searchControlBoxElement = document.getElementById("toolbar-search-navigation-control");

    this.element.addEventListener("search", this._onSearch.bind(this), false); // when the search is emptied
    this.element.addEventListener("mousedown", this._onSearchFieldManualFocus.bind(this), false); // when the search field is manually selected
    this.element.addEventListener("keydown", this._onKeyDown.bind(this), true);
   
    this._populateSearchNavigationButtons();
}