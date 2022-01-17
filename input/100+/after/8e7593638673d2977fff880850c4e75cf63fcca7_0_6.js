function generateThumbnail() {
    var html = [];
    
    var configValues = "Javascript," + $('#productJavascriptConfigUrl').val() + '|Groovy,' + $('#productGroovyConfigUrl').val();
    
    html.push('<div class="thumbnail" rel="popover"',
            ' data-content="ID: ',$('#productId').val(),
            '<br/>Name: ',$('#productName').val(),
            '<br/>Description: ',$('#productDescription').val(),
            '<br/>Thumbnail: ',$('#thumbnail').val(),
            '<br/>Icon: ',$('#icon').val(),'<br/>"',
            ' data-original-title="',$('#productName').val(),'" id="hoveroverimage',$('#productId').val(),'">',
            '<img src="',$('#thumbnail').val(),'" alt="',$('#productDescription').val(),'">',
            '<div class="caption">',
            '<h5>','<img src="',$('#icon').val(),'" style="height:16px;width:16px;"/> ',$('#productName').val(),'</h5>',
            '<p>',$('#productDescription').val(),'</p>',
            '<p><a href="javascript:removeProduct(\'',$('#productId').val(),'\');" class="btn btn-primary">Remove</a> <a href="javascript:updateProduct(\'',$('#productId').val(),'\');" class="btn">Update</a></p>',
            '<form id="existingProductForm',$('#productId').val(),'">',
            '<input type="hidden" name="existingProductId',$('#productId').val(),'" id="existingProductId',$('#productId').val(),'" value="',$('#productId').val(),'" />',
            '<input type="hidden" name="existingProductName',$('#productId').val(),'" id="existingProductName',$('#productId').val(),'" value="',$('#productName').val(),'" />',
            '<input type="hidden" name="existingProductDescription',$('#productId').val(),'" id="existingProductDescription',$('#productId').val(),'" value="',$('#productDescription').val(),'" />',
            '<input type="hidden" name="existingProductThumbnail',$('#productId').val(),'" id="existingProductThumbnail',$('#productId').val(),'" value="',$('#thumbnail').val(),'" />',
            '<input type="hidden" name="existingProductIcon',$('#productId').val(),'" id="existingProductIcon',$('#productId').val(),'" value="',$('#icon').val(),'" />',
            '<input type="hidden" name="existingProductDataType',$('#productId').val(),'" id="existingProductDataType',$('#productId').val(),'" value="',$('#productDataType').val(),'" />',
            '<input type="hidden" name="existingProductConfigManager',$('#productId').val(),'" id="existingProductConfigManager',$('#productId').val(),'" value="',configValues,'" />',
            '<input type="hidden" name="existingProductCategory',$('#productId').val(),'" id="existingProductCategory',$('#productId').val(),'" value="',$('#productCategory').val(),'" />',
            '<input type="hidden" name="existingProductVendor',$('#productId').val(),'" id="existingProductVendor',$('#productId').val(),'" value="',$('#productVendor').val(),'" />',
            '<input type="hidden" name="existingDependency',$('#productId').val(),'" id="existingDependency',$('#productId').val(),'" value="',$('#productDependency').val(),'" />',
            '</form>',
            '</div>',
            '</div>');
    
    return html.join("");
}