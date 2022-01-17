function (jqXHR, textStatus, errorThrown) {
            console.log("Twitter API error: "+textStatus);
            twitterData =  ERROR_FLAG;
            alert('Sorry, there was a problem retrieving Twitter info.  '+TRY_AGAIN_MSG);
        }