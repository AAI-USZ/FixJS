function(object, type, props, name, value, level, order, context)
    {
        try
        {
            return this.addMemberInternal.apply(this, arguments);
        }
        catch (err)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("domPanel.addMember; EXCEPTION " + err, err);
        }
    }