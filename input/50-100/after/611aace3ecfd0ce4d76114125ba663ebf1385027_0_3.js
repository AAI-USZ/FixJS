function updateOrder(v) {
    // if no value is passed, then read it from the DOM, otherwise write it in the DOM
    if (!v || !v.length) v = $('#order').val();
    else $('#order').val(v);
    
    currentOrder = v; // global
    setCookie('order', v);  // remember
    if (v) {
        $('#order option[value=]').remove(); // after we have sorted the items there's no way to return to the original order, so let's hide this option
    }
    sortItems();
}