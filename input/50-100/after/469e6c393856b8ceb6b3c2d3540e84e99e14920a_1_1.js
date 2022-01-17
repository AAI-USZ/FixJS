function(partner) {
        var thisExtendable = this.extend();
        var thisPrototype = cloner.clone(thisExtendable.prototype);
        var partnerPrototype = cloner.clone(partner.prototype);
        thisExtendable.prototype = cloner.extend(partnerPrototype, thisPrototype);
        return thisExtendable;
    }