function () {
    var moduleList = this.getChild('moduleList'),
        that = this,
        mm = this.monitoredModule,
        selPackageName = this.selected,
        factory;
    moduleList.removeAllChildren();
    moduleList.setOverflow(['hidden', 'auto']);
    delete this.selectedModule;
    if (this.selected) {
        factory = require(selPackageName);
        forEach(this.packages[selPackageName].visuals, function (type) {
            var Type, mv, success;
            try {
                Type = factory[type];
                if (Type && Type.prototype && Type.prototype.getDescription) {
                    mv = new VisualModule({
                        name: type,
                        description: Type.prototype.getDescription(),
                        preview: Type,
                        typeInfo: { factory: that.selected, type: type },
                        monitored: (mm && mm.factory === selPackageName && mm.type === type)
                    });
                    mv.setHtmlFlowing({ position: 'relative' }, true);
                    moduleList.addChild(mv, type);
                    success = true;
                } else {
                    success = false;
                }
            } catch (e) {
                console.log(e);
                success = false;
            }
            if (!success) {
                console.log("Cannot show " + factory + " " + type);
            }
        });
    }
}