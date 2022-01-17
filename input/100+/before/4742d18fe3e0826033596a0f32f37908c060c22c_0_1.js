function(o, animateTarget){
        var me = this,
            EventMappings = Extensible.calendar.data.EventMappings,
            form, rec;
        
		// Work around the CSS day cell height hack needed for initial render in IE8/strict:
		me.animateTarget = (Ext.isIE8 && Ext.isStrict) ? null : animateTarget;

        me.callParent([me.animateTarget, function(){
            me.titleField.focus(false, 100);
        }, me]);
        
        form = me.formPanel.form;
        
        // Only show the delete button if the data includes an EventID, otherwise
        // we're adding a new record
        me.deleteButton[o.data && o.data[EventMappings.EventId.name] ? 'show' : 'hide']();
        
        if (o.data) {
            rec = o;
			me.setTitle(rec.phantom ? me.titleTextAdd : me.titleTextEdit);
            form.loadRecord(rec);
        }
        else {
            me.setTitle(me.titleTextAdd);

            var start = o[EventMappings.StartDate.name],
                end = o[EventMappings.EndDate.name] || Extensible.Date.add(start, {hours: 1});
                
            rec = Ext.create('Extensible.calendar.data.EventModel');
            
            rec.data[EventMappings.StartDate.name] = start;
            rec.data[EventMappings.EndDate.name] = end;
            
            rec.data[EventMappings.IsAllDay.name] = !!o[EventMappings.IsAllDay.name] ||
                (start.getDate() !== Extensible.Date.add(end, {millis: 1}).getDate());
            
            rec.data[EventMappings.CalendarId.name] = me.calendarStore ?
                    me.calendarStore.getAt(0).data[Extensible.calendar.data.CalendarMappings.CalendarId.name] : '';
            
            if (EventMappings.Duration) {
                rec.data[EventMappings.Duration.name] = Extensible.Date.diff(start, end,
                    Extensible.calendar.data.EventModel.resolution);
            }
            
            form.reset();
            form.loadRecord(rec);
        }
        
        rec.data[EventMappings.RInstanceStartDate.name] = rec.getStartDate();
        
        me.dateRangeField.setValue(rec.data);
        me.activeRecord = rec;
        
        // Using setValue() results in dirty fields, so we reset the field state
        // after loading the form so that the current values are the "original" values
        form.getFields().each(function(item) {
            item.resetOriginalValue();
        });
        
		return me;
    }