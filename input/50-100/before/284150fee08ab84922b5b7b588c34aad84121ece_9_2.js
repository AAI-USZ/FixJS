function calcPercent(atom, dimName) {
            var pct;
            if(group) {
                pct = group.dimensions(dimName).percentOverParent(visibleKeyArgs);
            } else {
                pct = data.dimensions(dimName).percent(atom.value);
            }
            
            return chart.options.valueFormat.call(null, Math.round(pct * 1000) / 10) + "%";
        }