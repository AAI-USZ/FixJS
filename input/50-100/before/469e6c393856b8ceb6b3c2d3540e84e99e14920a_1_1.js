function(partner) {
        var thisExtendable = this.extend();
        var thisPrototype = pi.clone(thisExtendable.prototype);
        var partnerPrototype = pi.clone(partner.prototype);
        thisExtendable.prototype = pi.extend(partnerPrototype, thisPrototype);
        return thisExtendable;
    }