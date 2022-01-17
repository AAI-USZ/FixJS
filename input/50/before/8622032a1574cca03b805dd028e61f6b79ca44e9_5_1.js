function getTooltip(feature) {
        var tooltip = document.createElement('div');
        tooltip.className = 'wax-tooltip wax-tooltip-0';
        tooltip.innerHTML = feature;
        return tooltip;
    }