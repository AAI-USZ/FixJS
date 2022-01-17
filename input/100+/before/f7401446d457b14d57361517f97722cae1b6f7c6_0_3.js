function() {
        toDate = socorro.date.formatDate(socorro.date.now(), "US_NUMERICAL");
        fromDate = socorro.date.formatDate(new Date(socorro.date.now() - (socorro.date.ONE_DAY * 6)), "US_NUMERICAL");
        
        //set the value of the input fields
        $("#start_date").val(fromDate);
        $("#end_date").val(toDate);
        
        //set the dates on the figcaption
        $("#fromdate").empty().append(fromDate);
        $("#todate").empty().append(toDate);

        //set the product filters to the intial product and version
        setProductFilters();

        setLoader();
        drawCrashTrends(undefined, init_ver);
    }