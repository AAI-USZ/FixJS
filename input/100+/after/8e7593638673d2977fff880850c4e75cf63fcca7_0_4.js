function () {
        
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
    }