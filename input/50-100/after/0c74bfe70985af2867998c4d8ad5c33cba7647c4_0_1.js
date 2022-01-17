function(error, result) {
      for (var i = 6 - 1; i >= 0; i--) {
        var magento_result = result[i];
        if(magento_result.vwheritage_sync=1) {
          json_product(magento_result.sku, i, function(sku, i, data){
            if(typeof data !== "undefined" && data.ROWCOUNT>0) {

            }
            else{
              //json-shop has not the same itemnumber
              //unavable_skus += sku + "\n";
              //console.log(i)
              console.log(sku);
            }
          });
        }
      }
    }