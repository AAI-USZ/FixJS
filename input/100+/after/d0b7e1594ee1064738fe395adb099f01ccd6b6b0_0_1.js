function()
{
    WebInspector.View.call(this);
    this.registerRequiredCSS("nativeMemoryProfiler.css");
    this._memorySnapshot = null;
    this.element = document.createElement("div");
    this._table = this.element.createChild("table");
    this._divs = {};
    var row = this._table.insertRow();
    this._totalDiv = row.insertCell().createChild("div");
    this._totalDiv.addStyleClass("memory-bar-chart-total");
    row.insertCell();
}