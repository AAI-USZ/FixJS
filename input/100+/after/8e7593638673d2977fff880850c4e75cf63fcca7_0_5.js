function updateProduct(productId) {
    modalAction = 1;
    
    $('#productId').val($('#existingProductId' + productId).val());
    $('#productName').val($('#existingProductName' + productId).val());
    $('#productDescription').val($('#existingProductDescription' + productId).val());
    $('#productDataType').val($('#existingProductDataType' + productId).val());
    var configList = $('#existingProductConfigManager' + productId).val().split("|");
    for (var index = 0; index < configList.length ; index++) {
        var configEntry = configList[index].split(",");
        $('#product' + configEntry[0] + 'ConfigUrl').val(configEntry[1]);
    }
    
    $('select#productCategory option')
        .each(function() { this.selected = (this.val == $('#existingProductCategory' + productId).val()); });
    $('select#productVendor option')
        .each(function() { this.selected = (this.val == $('#existingProductVendor' + productId).val()); });
    var dependency = $('#existingDependency' + productId).val();
    if (dependency !== null && dependency !== '') {
        $('select#productDependency option')
            .each(function() { this.selected = (this.val == dependency); });
    } else {
        $('select#productDependency option')
            .each(function() { this.selected = false; });
    }
    $('#thumbnail').val($('#existingProductThumbnail' + productId).val());
    $('#icon').val($('#existingProductIcon' + productId).val());
    
    $('#productId').attr('disabled','disabled'); 
    $('#addProductTitle').hide();
    $('#updateProductTitle').show();
    $('#addProductItem').hide();
    $('#updateProductItem').show();
    $('#productModal').modal('show');
}