function(config) {
        otp.configure(this, config);

        otp.planner.Templates.THIS   = this;
        otp.planner.Templates.locale = this.locale;

        if(this.TP_ITINERARY == null)
            this.TP_ITINERARY = new Ext.XTemplate(
                  '<div id={id} class="dir-alt-route-inner">',
                    '<span class="time-span itinopt">{[otp.util.StringFormattingUtils.timeSpan(values.startTime, values.endTime, otp.planner.Templates.locale)]}</span>',
                    '<span class="duration-hours-mins itinopt">{[otp.util.StringFormattingUtils.durationHoursMins(values.duration, otp.planner.Templates.locale)]}</span>',
                  '</div>',
                  '<tpl if="numTransfers">',
                  '<div id={id} class="dir-alt-route-inner">',
                    '<span>&nbsp;&nbsp;</span>',
                    '<span class="transfers">{numTransfers} ',
                    '<tpl if="numTransfers == 1">' + this.locale.instructions.transfer  + '</tpl>',
                    '<tpl if="numTransfers != 1">' + this.locale.instructions.transfers + '</tpl>',
                    '</span>',
                  '</div>',
                  '</tpl>'
            ).compile();

        if(this.tripFeedbackDetails == null)
            // Trip Planner state messaging (eg: feedback emails, etc...).
            this.tripFeedbackDetails = new Ext.XTemplate( 
                this.locale.labels.trip_details 
                + ' {fromPlace} ' + this.locale.directions.to + ' {toPlace}'
                + ' {arriveBy} {time} ' + this.locale.directions.on + ' {date}, '
                + this.locale.directions.via + ' {[otp.util.Modes.translate(values["mode"])]}, '
                + ' {opt}'
                + '<tpl if="opt == \'TRIANGLE\'"> (tf={triangleTimeFactor}, sf={triangleSlopeFactor}, hf={triangleSafetyFactor})</tpl>'
                + ', '
                + this.locale.labels.with_a_walk + ' {maxWalkDistance}m ' 
            ).compile();


        if(this.tripPrintTemplate == null)
            this.tripPrintTemplate = new Ext.XTemplate( 
                '{url}?' + otp.planner.ParamTemplate
            ).compile();

        if(this.streetviewTemplate == null)
            this.streetviewTemplate =  new Ext.XTemplate(
                '<a href="javascript:void;" onClick="otp.core.MapStatic.streetview({x}, {y});">{name}</a>'
            ).compile();

        if(this.TP_TRIPDETAILS == null)
            this.TP_TRIPDETAILS = new Ext.XTemplate(
                '<div id="trip-details">',
                '<h3>' + this.locale.labels.trip_details + '</h3>',
                '<table cellpadding="3" cellspacing="0" border="0">',
                    '<tr><td><strong>' + this.locale.labels.travel  + '</strong></td><td>{[otp.planner.Templates.THIS.prettyDateTime(values.startTime)]}</td></tr>',
                    '<tr><td><strong>' + this.locale.labels.trip_length + '</strong></td><td>{duration} ' + this.getDurationTemplateString() + '</td></tr>',
                    '<tpl if="walkDistance"><tr><td><strong>{distanceVerb}</strong></td><td>{walkDistance}</td></tr></tpl>',

                    '<tpl if="regularFare != null && showFareInfo == true">',
                      '<tr><td><strong>' + this.locale.labels.fare  + '</strong></td><td>' + this.locale.labels.regular_fare + ' {regularFare}</td></tr>',
                      '<tpl if="seniorFare != null"><tr><td></td><td>'   + this.locale.labels.senior_fare  + ' {seniorFare}</td><tr></tpl>',
                      '<tpl if="studentFare  != null"><tr><td></td><td>' + this.locale.labels.student_fare + ' {studentFare}</td><tr></tpl>',
                    '</tpl>',

                    '<tr class="valid_date"><td>&nbsp;</td><td>&nbsp;</td></tr>',
                    '<tr class="valid_date"><td></td><td>' + this.locale.labels.valid + ' {[otp.planner.Templates.THIS.prettyDateTime()]}</td></tr>',
                '</table></div>'
            ).compile();

        if(this.HEADSIGN == null)
            this.HEADSIGN = '<tpl if="headsign != null && headsign.length &gt; 0"> ' + this.locale.directions.to + ' {headsign}</tpl>';

        if(this.TP_LEG_MODE == null)
            this.TP_LEG_MODE = ''
                + '<h4>' 
                + '<a href="javascript:void;">{[otp.util.Modes.translate(values["mode"])]}</a>'
                + ' {routeName} '
                + this.HEADSIGN
                + '</h4>';

        if(this.TP_LEG_CONTINUES == null)
            this.TP_LEG_CONTINUES = ''
                + '<h4>'
                + '<a href="javascript:void;">' + this.locale.instructions.continue_as + '</a> '
                + ' {routeName} '
                + this.HEADSIGN
                + '<span class="transfers">(' + this.locale.instructions.stay_aboard + ')</span>'
                + '</h4>';

        if(this.TP_LEG_BASE_STR == null)
            this.TP_LEG_BASE_STR = ''
                + '<p class="leg-info">'
                + '<span class="time">{startTimeDisplayShort}</span> ' + this.locale.instructions.depart + ' {fromName}'
                + '<tpl if="fromStopCode != null && fromStopCode.length &gt; 0 && showStopCodes == true">'
                +   '<br/>'
                +   '<span class="stopid">' + this.locale.labels.stop_id + ' {fromStopCode}</span>'
                + '</tpl>'
                + '</p>'
                + '<tpl if="duration != null">'
                +   '<div class="duration">{duration} ' + this.getDurationTemplateString() + '</div>'
                + '</tpl>'
                + '<p class="leg-info">'
                + '<span class="time">{endTimeDisplayShort}</span> ' + this.locale.instructions.arrive + ' {toName}'
                + '<tpl if="toStopCode != null && toStopCode.length &gt; 0 && showStopCodes == true">'
                +   '<br/>'
                +   '<span class="stopid">' + this.locale.labels.stop_id + ' {toStopCode}</span>'
                + '</tpl>'
                + '</p>'
                + '<tpl if="agencyName != undefined && agencyName != null && agencyName.length &gt; 0 && showAgencyInfo == true">'
                +   '<p class="agency-leg-info">'
                +     '<tpl if="agencyUrl != null && agencyUrl.length &gt; 1">'
                +       '<span>' + this.locale.labels.agency_msg + ' <a href="{agencyUrl}" target="#" title="' + this.locale.labels.agency_msg_tt + '">{agencyName}</a>.</span>'
                +     '</tpl>'
                +     '<tpl if="agencyUrl == null || agencyUrl.length &lt; 1">'
                +       '<span>' + this.locale.labels.agency_msg + ' {agencyName}.</span>'
                +     '</tpl>'
                +   '</p>'
                + '</tpl>'
                + '<tpl if="alerts != null && alerts.length &gt; 0">'
                + '<tpl for="alerts">'
                +   '<p class="alert"><img src="images/ui/trip/alert.png" align="absmiddle"/> '
                +   '<b>' + this.locale.labels.alert_for_rt + ' {parent.routeShortName}: </b>{.}</p>'
                + '</tpl>'
                + '</tpl>';

        if(this.TP_WALK_LEG == null)
            this.TP_WALK_LEG = this.makeLegTemplate(this.locale.instructions.walk);

        if(this.TP_BICYCLE_LEG == null)
            this.TP_BICYCLE_LEG = this.makeLegTemplate(this.locale.instructions.bike);

        if(this.TP_CAR_LEG == null)
            this.TP_CAR_LEG = this.makeLegTemplate(this.locale.instructions.drive);

        if(this.TP_START == null)
            this.TP_START = new Ext.XTemplate(
                  '<h4><a href="javascript:void;">' + this.locale.instructions.start_at + '</a> {name}</h4>'
            ).compile();

        if(this.TP_END == null)
            this.TP_END = new Ext.XTemplate(
                  '<h4><a href="javascript: void;">' + this.locale.instructions.end_at + '</a> {name}</h4>'
            ).compile(); 
    }