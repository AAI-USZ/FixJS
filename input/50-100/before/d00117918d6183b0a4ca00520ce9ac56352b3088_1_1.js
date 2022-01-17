function(data) {
            // remove the loading animation
            $("#loading").remove();

            if(data.status === "success") {
                legnd[0].insertAdjacentHTML("afterend", "<div class='success'>" + data.message + "</div>");
            } else {
                legnd[0].insertAdjacentHTML("afterend", "<div class='error'>" + data.message + "</div>");
            }
        }