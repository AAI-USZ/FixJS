function(data) {
                var data = $.parseJSON(data);
                $(".standard-price-value").html(data["price"]);
                $(".for-sale-price-value").html(data["for-sale-price"]);
                $(".for-sale-standard-price-value").html(data["for-sale-standard-price"]);
                $(".packing-result").html(data["packing-result"]);
                $.jGrowl(data["message"]);

                // Re-bind lightbox
                $("a.product-image").lightBox({
                    "txtImage" : "Image",
                    "txtOf" : " of "
                });
            }