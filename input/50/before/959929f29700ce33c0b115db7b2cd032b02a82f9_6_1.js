function(date, allDay, jsEvent, view){ $.publish('/contentLevel/calendar_'+calendarDefinition.id+'/dayClick', [date, allDay, jsEvent, view]);}