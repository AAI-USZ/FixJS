function()
{
    this.element = document.createElement("div");

    this._itemsGraphsElement = document.createElement("div");
    this._itemsGraphsElement.id = "resources-graphs";
    this.element.appendChild(this._itemsGraphsElement);

    this._dividersElement = document.createElement("div");
    this._dividersElement.className = "resources-dividers";
    this.element.appendChild(this._dividersElement);

    this._gridHeaderElement = document.createElement("div"); 

    this._eventDividersElement = document.createElement("div");
    this._eventDividersElement.className = "resources-event-dividers";
    this._gridHeaderElement.appendChild(this._eventDividersElement);

    this._dividersLabelBarElement = document.createElement("div");
    this._dividersLabelBarElement.className = "resources-dividers-label-bar";
    this._gridHeaderElement.appendChild(this._dividersLabelBarElement);

    this.element.appendChild(this._gridHeaderElement);
}