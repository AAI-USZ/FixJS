function (jqXHR, textStatus, errorThrown) {
            console.log("Yahoo API error: "+textStatus);
            rssFeedData = ERROR_FLAG;
            trailStatusData = {};
            trailStatusData.title = ERROR_MSG_NO_DATA;
            trailStatusData.updatedDate = "N/A";
            //alert('Sorry, there was a problem retrieving Website News and Trail Status.  '+TRY_AGAIN_MSG);
        }