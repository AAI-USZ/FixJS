function(e, tooltipConfig) {
            if (tooltipConfig) {
                tooltipHTML = tooltipConfig.tooltipHTML || false;
                tooltipAutoClose = tooltipConfig.tooltipAutoClose || false;
                tooltipArrow = tooltipConfig.tooltipArrow || false;
                tooltipTop = tooltipConfig.tooltipTop || false;
                tooltipLeft = tooltipConfig.tooltipLeft || false;
                tooltipOnShow = tooltipConfig.onShow || false;
                toggleTooltip();
            } else {
                debug.error("No tooltip mode specifed");
            }
        }