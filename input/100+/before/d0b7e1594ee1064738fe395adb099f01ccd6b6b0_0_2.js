function()
    {
        var memoryBlock = this._memorySnapshot;
        if (!memoryBlock)
            return;

        var MB = 1024 * 1024;
        var maxSize = 100 * MB;
        for (var i = 0; i < memoryBlock.children.length; ++i)
            maxSize = Math.max(maxSize, memoryBlock.children[i].size);
        var maxBarLength = 500;
        var barLengthSizeRatio = maxBarLength / maxSize;

        for (var i = memoryBlock.children.length - 1; i >= 0 ; --i) {
            var child = memoryBlock.children[i];
            var name = child.name;
            var barDiv = this._bars[name];
            if (!barDiv) {
                var row = this._table.insertRow();
                var nameDiv = row.insertCell(-1).createChild("div");
                var viewProperties = WebInspector.MemoryBlockViewProperties._forMemoryBlock(child);
                var title = viewProperties._description;
                nameDiv.textContent = title;
                nameDiv.addStyleClass("memory-bar-chart-name");
                var barCell = row.insertCell(-1);
                barDiv = barCell.createChild("div");
                barDiv.addStyleClass("memory-bar-chart-bar");
                var viewProperties = WebInspector.MemoryBlockViewProperties._forMemoryBlock(child);
                barDiv.style.backgroundColor = viewProperties._fillStyle;
                this._bars[name] = barDiv;
                var sizeDiv = barCell.createChild("div");
                sizeDiv.addStyleClass("memory-bar-chart-size");
                this._sizes[name] = sizeDiv;
            }
            barDiv.style.width = child.size * barLengthSizeRatio + "px";
            barDiv.textContent = (child.size / memoryBlock.size * 100).toFixed(0) + "%";
            var sizeDiv = this._sizes[name];
            sizeDiv.textContent = (child.size / MB).toFixed(1) + "\u2009MB";
        }

        var viewProperties = WebInspector.MemoryBlockViewProperties._forMemoryBlock(memoryBlock);
        this._totalDiv.textContent = viewProperties._description + ": " + (memoryBlock.size / MB).toFixed(1) + "\u2009MB";
    }