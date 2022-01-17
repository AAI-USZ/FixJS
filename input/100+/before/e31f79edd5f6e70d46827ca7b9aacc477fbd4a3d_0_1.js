function renderIssueItem(data)
{
    document.itemCounter++;
    return "<img class='cross' src='/static/images/cross.png' id='item-"+document.itemCounter+"' title='Delete this item' alt='Delete this item' onclick='deleteItem(\"item-"+document.itemCounter+"\")'/>" +
    "<img class='down' src='/static/images/down.png' title='Move this item down' alt='Move this item down' onclick='moveDownItem(\"item-"+document.itemCounter+"\")'/>" +
    "<img class='up' src='/static/images/up.png' title='Move this item up' alt='Move this item up' onclick='moveUpItem(\"item-"+document.itemCounter+"\")'/>" +
    "<div class='form-field'>URL: <input type='text' name='item-url' value='"+data.url+"'/></div>"+
    "<div class='form-field'>Title: <input type='text' name='item-title' value='"+data.title+"'/></div>" + 
    "<div class='form-field'>Description: <textarea name='item-description'>"+data.description + "</textarea></div>" + 
    "<div class='form-field'>Image URL: <input type='text' id='img-url-"+document.itemCounter+"'  name='item-img' value='" + data.img + "'/> <input type='button' class='img-update' value='Update Image' onclick='changeImg(\"img-"+document.itemCounter+"\", \"img-url-"+document.itemCounter+"\")' /></div>" +
    "<img id='img-"+document.itemCounter+"' src='"+data.img+"' alt='URL does not resolve to image.' /><br />" +
    "<input type='hidden' name='item-ordernumber' value='"+document.itemCounter+"' />";
}