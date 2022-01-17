function() {
        
        // hide all error messages
        $('#modelDataErrorResult').hide();
        $('#modelSuccessResult').hide();
        $('#modelRuntimeErrorResult').hide();
        
        if (modalAction == 0) {
            $.ajax({
                url: 'product/CreateProduct.groovy?' + $('#productForm').serialize(),
                success: function(data) {
                    if (data == 'success') {
                        $('#modelRuntimeErrorResult').hide();
                        $('#updateProductItem').hide();
                        $('#addProductItem').hide()
                        $('#productCloseButton').hide();
                        $('#modelForm').hide();
                        $('#modelSuccessResult').show();
                        $('#modelSuccessResultMsg').text('Product add [' + 
                            $('#productId').val() + '] submitted to system.');
                            
                        var html = [];
                        html.push(
                            '<li class="span3" id="productThumbnailEntry',$('#productId').val(),'">',
                            generateThumbnail(),
                            '</li>');
                        $("#productThumbnails").append(html.join(""));
                        
                        
                        $('[id^=hoveroverimage]').popover({"placement":"bottom"});
                        
                        // delay and hide the modal
                        setTimeout(function () {
                            $('#productModal').modal('hide');    
                        }, 1500);
                        
                    } else {
                        $('#modelDataErrorResult').show();
                        $('#modelDataErrorResultMsg').text(data);
                    }
                },
                error: function(data) {
                    $('#modelSuccessResult').hide();
                    $('#modelForm').hide();
                    $('#modelRuntimeErrorResult').show();
                    $('#modelRuntimeErrorResultMsg').text(data);
                    
                }
            });
        } else {
            $.ajax({
                url: 'product/UpdateProduct.groovy?productId=' + $('#productId').val() + '&' + $('#productForm').serialize(),
                success: function(data) {
                    if (data == 'success') {
                        $('#modelRuntimeErrorResult').hide();
                        $('#addProductItem').hide();
                        $('#updateProductItem').hide();
                        $('#productCloseButton').hide();
                        $('#modelForm').hide();
                        $('#modelSuccessResult').show();
                        $('#modelSuccessResultMsg').text('Product update [' + 
                            $('#productId').val() + '] submitted to system.');
                            
                        var html = [];
                        html.push(generateThumbnail());
                        $("#productThumbnailEntry" + $('#productId').val()).html(html.join(""));
                        
                        $('[id^=hoveroverimage]').popover({"placement":"bottom"});
                        
                        // delay and hide the modal
                        setTimeout(function () {
                            $('#productModal').modal('hide');    
                        }, 1500);
                        
                    } else {
                        $('#modelDataErrorResult').show();
                        $('#modelDataErrorResultMsg').text(data);
                    }
                },
                error: function(data) {
                    $('#modelSuccessResult').hide();
                    $('#modelForm').hide();
                    $('#modelRuntimeErrorResult').show();
                    $('#modelRuntimeErrorResultMsg').text(data);
                    
                }
            });
        }
    }