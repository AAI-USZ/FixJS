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
            var divs = this._divs[name];
            if (!divs) {
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
                var unusedDiv = barDiv.createChild("div");
                unusedDiv.addStyleClass("memory-bar-chart-unused");
                var percentDiv = barDiv.createChild("div");
                percentDiv.addStyleClass("memory-bar-chart-percent");
                var sizeDiv = barCell.createChild("div");
                sizeDiv.addStyleClass("memory-bar-chart-size");
                divs = this._divs[name] = { barDiv: barDiv, unusedDiv: unusedDiv, percentDiv: percentDiv, sizeDiv: sizeDiv };
            }
            var unusedSize = 0;
            if (!!child.children) {
                unusedSize = child.size;
                for (var j = 0; j < child.children.length; ++j)
                    unusedSize -= child.children[j].size;
            }
            var unusedLength = unusedSize * barLengthSizeRatio;
            var barLength = child.size * barLengthSizeRatio;

            divs.barDiv.style.width = barLength + "px";
            divs.unusedDiv.style.width = unusedLength + "px";
            divs.percentDiv.textContent = barLength > 20 ? (child.size / memoryBlock.size * 100).toFixed(0) + "%" : "";
            divs.sizeDiv.textContent = (child.size / MB).toFixed(1) + "\u2009MB";
        }

        var viewProperties = WebInspector.MemoryBlockViewProperties._forMemoryBlock(memoryBlock);
        this._totalDiv.textContent = viewProperties._description + ": " + (memoryBlock.size / MB).toFixed(1) + "\u2009MB";
    }