function(top)
    {
        const overviewHeight = 90;
        const sectionMinHeight = 100;
        top = Number.constrain(top, overviewHeight + sectionMinHeight, this.element.offsetHeight - sectionMinHeight);

        this.splitView.element.style.height = (top - overviewHeight) + "px";
        this._timelineMemorySplitter.style.top = (top - 2) + "px";
        this._memoryStatistics.setTopPosition(top);
    }