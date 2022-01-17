function getBounds (el) {

    var clientRect,

    bounds = {};



    if (el.getBoundingClientRect){

        clientRect = el.getBoundingClientRect();





        // TODO add scroll position to bounds, so no scrolling of window necessary

        bounds.top = clientRect.top;

        bounds.bottom = clientRect.bottom || (clientRect.top + clientRect.height);

        bounds.left = clientRect.left;



        // older IE doesn't have width/height, but top/bottom instead

        bounds.width = clientRect.width || (clientRect.right - clientRect.left);

        bounds.height = clientRect.height || (clientRect.bottom - clientRect.top);



        return bounds;



    }

}