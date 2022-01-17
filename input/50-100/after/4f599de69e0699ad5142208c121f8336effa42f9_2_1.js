function() {
        if (!this.getUseAnimation()) {
            return;
        }

        var targets = this.getTargetItems();

        for (var i = 0; i < targets.length; i++) {
            Ext.Anim.run(Ext.get(targets[i]), 'fade', {
                duration: i === 0 ? 150 : i * 300
            });
        }
    }