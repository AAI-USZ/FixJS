function()
    {
        const barOffset = 3;
        const minGap = 3;

        var minWidth = WebInspector.TimelineCalculator._minWidth;
        var widthAdjustment = minWidth / 2;

        var width = this._graphRowsElementWidth;
        var boundarySpan = this._overviewPane.windowEndTime() - this._overviewPane.windowStartTime();
        var scale = boundarySpan / (width - minWidth - this._timelinePaddingLeft);
        var startTime = this._overviewPane.windowStartTime() - this._timelinePaddingLeft * scale;
        var endTime = startTime + width * scale;

        var tasks = this._mainThreadTasks;
        if (!tasks.length)
            return;

        function compareEndTime(value, task)
        {
            return value < task.endTime ? -1 : 1;
        }

        var taskIndex = insertionIndexForObjectInListSortedByFunction(startTime, tasks, compareEndTime);
        if (taskIndex === tasks.length)
            return;

        var container = this._cpuBarsElement;
        var element = container.firstChild.nextSibling;
        var lastElement;
        var lastLeft;
        var lastRight;

        while (taskIndex < tasks.length) {
            var task = tasks[taskIndex];
            if (task.startTime > endTime)
                break;
            taskIndex++;

            var left = Math.max(0, this._calculator.computePosition(task.startTime) + barOffset - widthAdjustment);
            var right = Math.min(width, this._calculator.computePosition(task.endTime) + barOffset + widthAdjustment);

            if (lastElement) {
                var gap = Math.floor(left) - Math.ceil(lastRight);
                if (gap < minGap) {
                    lastRight = right;
                    continue;
                }
                lastElement.style.width = (lastRight - lastLeft) + "px";
            }

            if (!element)
                element = container.createChild("div", "timeline-graph-bar");

            element.style.left = left + "px";
            lastLeft = left;
            lastRight = right;

            lastElement = element;
            element = element.nextSibling;
        }

        if (lastElement)
            lastElement.style.width = (lastRight - lastLeft) + "px";

        while (element) {
            var nextElement = element.nextSibling;
            container.removeChild(element);
            element = nextElement;
        }
    }