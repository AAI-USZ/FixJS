function (controlInfo) {
            link.textContent = controlInfo.caption;
            link.setAttribute('data-original-title', controlInfo.tooltip);
            link.href = $root + controlInfo.urlSuffix;
        }