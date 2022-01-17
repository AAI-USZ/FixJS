function(event) {
        event.preventDefault();

        selectedProduct = $("#product").val();
        selectedVersion = $("#version").val();

        base_url = "/crash_trends/json_data?";
        fromDate = $("#start_date").val();
        toDate = $("#end_date").val();
        var params = {
            "product" : selectedProduct,
            "version" : selectedVersion,
            "start_date" : socorro.date.formatDate(socorro.date.convertToDateObj(fromDate), "ISO"),
            "end_date" : socorro.date.formatDate(socorro.date.convertToDateObj(toDate), "ISO")
        };

        //validate that toDate is after fromDate and a product is selected
        if(validateForm(fromDate, toDate, selectedProduct)) {
            //set the dates on the figcaption
            $("#fromdate").empty().append(fromDate);
            $("#todate").empty().append(toDate);
            
            $("title").empty().append("Crash Trends Report For " + selectedProduct + " " + selectedVersion);
            
            // add the loading animation
            setLoader();
            drawCrashTrends(base_url + $.param(params));
        }
    }