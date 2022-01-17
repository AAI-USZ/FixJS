function updateProduct(productId) {
    modalAction = 1;
    
    $('#productId').val($('#existingProductId' + productId).val());
    $('#productName').val($('#existingProductName' + productId).val());
    $('#productDescription').val($('#existingProductDescription' + productId).val());
    $('#thumbnail').val($('#existingProductThumbnail' + productId).val());
    $('#icon').val($('#existingProductIcon' + productId).val());
    
    $('#productId').attr('disabled','disabled'); 
    $('#addProductTitle').hide();
    $('#updateProductTitle').show();
    $('#addProductItem').hide();
    $('#updateProductItem').show();
    $('#productModal').modal('show');
}