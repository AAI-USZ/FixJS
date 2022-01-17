function(e, tooltipData) {
                hideTooltip();
                $(window).trigger("init.tooltip.sakai", tooltipData);
            }