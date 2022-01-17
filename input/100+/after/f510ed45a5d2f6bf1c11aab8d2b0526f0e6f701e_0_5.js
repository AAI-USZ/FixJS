function createScrollBar(width, height) {

            var scrollDiv = document.createElement("div");

            scrollDiv.style.position = 'absolute';

            scrollDiv.style.width = width + "px";

            scrollDiv.style.height = height + "px";

            scrollDiv.style.webkitBorderRadius = "2px";

            scrollDiv.style.opacity = 0;

            scrollDiv.className = 'scrollBar';

            scrollDiv.style.background = "black";

            return scrollDiv;

        }