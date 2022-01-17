function(event) {
            event.preventDefault();

            // Remove any previously displayed error/success messages
            $(".error, .success").remove();

            // We get a list of all tables, as each table contains the versions for a single product.
            var tbls = $("#update_featured").find("table"),
            prodErrArray = [],
            errorMsg = "Each product should have a minimum of one, and a maximum of four featured products. The following products does not meet this criteria, ",
            params = $(this).serialize();

            // Loop through all tables and ensure there are no more than four checked input elements,
            // as more than four featured versions per product is not allowed.
            tbls.each(function(i,d) {
                var featuredProdLength = $(this).find("input:checked").length;

                // If there are more than four, raise an error and prevent form submission.
                if(featuredProdLength < 1 || featuredProdLength > 4) {
                    prodErrArray.push($(this).attr("data-product"));
                }
            });

            if(prodErrArray.length > 0) {
                $("<p class='error'>" + errorMsg + prodErrArray.join(",") + "</p>").insertBefore(updateFrm);

                window.scroll(0, 0);
            } else {
                $.getJSON("/admin/update_featured_versions?" + params, function(data) {
                    for(item in data) {
                        console.log(data[item]);
                    }
                });
            }
        }