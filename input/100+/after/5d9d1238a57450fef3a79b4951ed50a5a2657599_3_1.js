function()
{
    this._element = document.createElement("div");
    this._element.textContent = "Search:";

    this._searchInputElement = this._element.createChild("input");
    this._searchInputElement.id = "search";
    this._searchInputElement.type = "search";
    this._searchInputElement.incremental = true;
    this._searchInputElement.results = 0;

    this._searchNavigationNextElement = this._element.createChild("div", "toolbar-search-navigation toolbar-search-navigation-next hidden");
    this._searchNavigationNextElement.addEventListener("mousedown", this._onNextButtonSearch.bind(this), false); 
    this._searchNavigationNextElement.title = WebInspector.UIString("Search Next");

    this._searchNavigationPrevElement = this._element.createChild("div", "toolbar-search-navigation toolbar-search-navigation-prev hidden");
    this._searchNavigationPrevElement.addEventListener("mousedown", this._onPrevButtonSearch.bind(this), false);
    this._searchNavigationPrevElement.title = WebInspector.UIString("Search Previous");

    this._matchesElement = this._element.createChild("span", "search-results-matches");

    this._searchInputElement.addEventListener("search", this._onSearch.bind(this), false); // when the search is emptied
    this._searchInputElement.addEventListener("mousedown", this._onSearchFieldManualFocus.bind(this), false); // when the search field is manually selected
    this._searchInputElement.addEventListener("keydown", this._onKeyDown.bind(this), true);

    var closeButtonElement = this._element.createChild("span", "drawer-header-close-button");
    closeButtonElement.textContent = WebInspector.UIString("\u00D7");
    closeButtonElement.addEventListener("click", this.cancelSearch.bind(this), false);
}