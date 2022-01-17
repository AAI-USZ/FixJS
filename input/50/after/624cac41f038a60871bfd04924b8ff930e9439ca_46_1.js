function(e, tooltipData) {
                hideTooltip();
                $(document).trigger('init.tooltip.sakai', tooltipData);
            }