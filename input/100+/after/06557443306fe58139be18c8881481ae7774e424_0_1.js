function Network_Overview_householdUsage() {
    var cap = UCapCore.household[4];
    var usage = UCapCore.household[5];
    var template1,template2, template3;
    if(!isNaN(cap) && !isNaN(usage) && !(usage < 0)){
        //No Cap
        if(cap == -1 || cap == 0){
            template1 = "This household does not have an active bandwidth cap. <a href=\"javascript:loadModule({tar:'userContent',src:'networkManager',act:'manager',func:'Network_Manager_capManagement'});Network_clearActive();\">Would you like to set one?</a>";
            $('#household-usagestatus').html(template1);
            if(Math.round(usage/1073741824) <= 1)
                template2 = Math.round(usage / 1048576) + " MB being used.";
            else
                template2 = Math.round(usage / 1073741824) + " GB being used.";
            $('#household-usageprogress').html(template2);
            UCapViz.drawProgressBar({tar:"household-progressbar", val:0, disabled:true});
        } else {
            var progress = Math.round((usage / cap) * 100);
            template1 = "This household currently has ";
            if(Math.round((cap - usage)/1073741824) < 1)
                template1 += Math.round((cap - usage) / 1048576) + " MB of bandwidth left for this month."; //<br/>"+daysRemaining+" days until the next billing cycle starts.";
            else
                template1 += Math.round((cap - usage) / 1073741824) + " GB of bandwidth left for this month."; //<br/>"+daysRemaining+" days until the next billing cycle starts.";
            $('#household-usagestatus').html('<h3>'+template1+'</h3>');

            if(Math.round(usage/1073741824) <= 1)
                template2 = Math.round(usage / 1048576) + " MB or " + progress + "% of " + Math.round(cap / 1073741824) + "GB being used.";
            else
                template2 = Math.round(usage / 1073741824) + " GB or " + progress + "% of " + Math.round(cap / 1073741824) + "GB being used.";
            $('#household-usageprogress').html(template2);

            UCapViz.drawProgressBar({tar:"household-progressbar", val:progress});
			
			//Logic to calculate days remaining goes here.
//            var month = new Date().getMonth();
//            var billingDate = UCapCore.household[7].split(' ').slice(0,1);
//            billingDate = billingDate[0].split('-');
//            var day = billingDate[2];
//
//            var monthLength = new Date(billingDate[0], parseInt(month), 0).getDate();
//            var daysRemaining = monthLength-day;
			var today = new Date();
			var billingDay = UCapCore.household[7].split(' ');
			billingDay = billingDay[0].split('-');
			billingDay = new Date(billingDay[0], billingDay[1] - 1, billingDay[2]);
			billingDay.setMonth(billingDay.getMonth( ) + 1 );
			
			var daysRemaining = differenceInDays(today, billingDay);
			if (daysRemaining == 1)
				template3 = daysRemaining + " day";
			else
				template3 = daysRemaining + " days";
			template3 += " to end of billing cycle."
			$('#household-billingstatus').html('<h3>'+template3+'</h3>');
        }
    }
}