function(dateString, meData){
            var d = new Date(parseInt(dateString,10));
            var UTCDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()));
            if (meData && meData.user.locale) {
                UTCDate.setHours(UTCDate.getUTCHours() + meData.user.locale.timezone.GMT);
            }
            return UTCDate;
        }