function(data) {
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
                }