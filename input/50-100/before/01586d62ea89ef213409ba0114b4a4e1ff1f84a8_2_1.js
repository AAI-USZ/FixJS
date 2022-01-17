function(feature) {
            if (feature) {
                bean.fire(interaction, 'on', {
                    parent: parent(),
                    data: feature,
                    formatter: gm.formatter().format,
                    pos: pos,
                    e: e
                });
            } else {
                bean.fire(interaction, 'off');
            }
        }