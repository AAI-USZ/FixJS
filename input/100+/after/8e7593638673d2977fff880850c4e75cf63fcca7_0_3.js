function() {
    $('#addProductItem').click(function(event) {
        event.preventDefault();
        $('#productForm').submit();
    });
    
    $('#updateProductItem').click(function(event) {
        event.preventDefault();
        $('#productForm').submit();
    });
    
    $('#removeProductItem').click(function(event) {
        event.preventDefault();
        $.ajax({
                url: 'product/RemoveProduct.groovy?productId=' + $('#removeModalFormId').val(),
                success: function(data) {
                    if (data == "success") {
                        // setup the message
                        $('#removeModelMsg').hide();
                        
                        $('#removeModelSuccessMsg').show();
                        $('#removeModelSuccessResultMsg').text('Product removal [' + 
                            $('#removeModalFormId').val() + '] submitted to system.');
                        $('#removeModelErrorMsg').hide();
                        
                        // setup the buttons
                        $('#removeProductCloseButton').hide();
                        $('#removeProductItem').hide();
                        
                        // remove the thumbnail
                        $('#productThumbnailEntry' + $('#removeModalFormId').val()).remove();
                        
                        // delay and hide the modal
                        setTimeout(function () {
                            $('#removeModal').modal('hide');    
                        }, 1500);
                        
                    } else {
                        // setup the message
                        $('#removeModelMsg').hide();
                        
                        $('#removeModelSuccessMsg').hide();
                        $('#removeModelErrorMsg').show();
                        $('#removeModelErrorResultMsg').html('Product [' + 
                            $('#removeModalFormId').val() + '] could not be removed : ' + data);
                        
                        // setup the buttons
                        $('#removeProductCloseButton').show();
                        $('#removeProductItem').hide();
                        
                    }
                }
        });
    })
    
    $("#productId").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must provide ID"
    });
    
    $("#productName").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must provide name"
    });
    
    $("#productDescription").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must provide description"
    });
    
    $("#thumbnail").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must provide thumbnail"
    });
    
    $("#icon").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must provide icon"
    });
    
    $("#productDataType").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must provide type"
    });
    
    $("#productCategory").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must select category"
    });
    
    $("#productCategory").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must select category"
    });
    
    
    $("#productCategory").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must select category"
    });
    
    $("#productVendor").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Must provide vendor"
    });
    
    $('#productForm').validated(function() {
        
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
                        
                        $('#productDependency').append('<option value="' + $('#productId').val() + '">'
                            + $('#productName').val() + '</option>');
                        
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
    });
    
    $('#productModal').on('hidden', function () {
        
        $('#productId').val('');
        $('#productName').val('');
        $('#productDescription').val('');
        $('#thumbnail').val('');
        $('#icon').val('');
        $('#productDataType').val('');
        $('#productJavascriptConfigUrl').val('');
        $('#productGroovyConfigUrl').val('');
        $('#addProductItem').show();
        $('#updateProductItem').hide();
        $('#productCloseButton').show();
        $('#modelForm').show();
        $('#modelDataErrorResult').hide();
        $('#modelSuccessResult').hide();
        $('#modelRuntimeErrorResult').hide();
        $('#addProductTitle').show();
        $('#updateProductTitle').hide();
        $('#productId').removeAttr('disabled');
        modalAction = 0;
    });
    
    
    $('#removeModal').on('hidden', function () {
        $('#removeModelMsg').show();
        $('#removeModelSuccessMsg').hide();
        $('#removeModelErrorMsg').hide();
        $('#removeProductCloseButton').show();
        $('#removeProductItem').show();
        
        
    });
    
    
    $('[id^=hoveroverimage]').popover({"placement":"bottom"});
}