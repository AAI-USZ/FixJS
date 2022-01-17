function() {
        var pack = this.template.cloneNode(true);
        pack.id = 'package_block_' + (++this.packageIncrement);
        pack.addClassName('package-block');
        pack.select('.package-number span')[0].update(this.packageIncrement);
        this.packagesContent.insert({top: pack});
        pack.select('.AddSelectedBtn')[0].hide();
        pack.show();
    }