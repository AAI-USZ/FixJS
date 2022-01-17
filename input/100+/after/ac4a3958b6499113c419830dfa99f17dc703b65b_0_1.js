function(t,dropEvent) {
        this.tree = t;
        var dropNode = dropEvent.dropNode;
        var target = dropEvent.target;
        if (!target.attributes.type) return false;
        if (target.attributes.type == 'gallery-album' && dropNode.attributes.type == 'gallery-item' && dropEvent.point != 'append') return false;
        if (dropNode.attributes.type == 'gallery-album' && target.attributes.type == 'gallery-item') return false;
        return true;
    }