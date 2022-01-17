function () {

    var COLUMNS_COUNT = 4,

        ROWS_COUNT = 3,

        DELTA = 8,

        PAGE_WIDTH,

        PAGE_HEIGHT,

        menuSelectedPage = null,

        currentEditPage = null,

        OptionsMenu = false,

        reports = null,

        urls,

        thumbs,

        dragPage = null,

        lastPosition = null,

        pagePosX,

        pagePosY,

        _offsetX,

        _offsetY,

        grad_radius,

        currentItem;



    function d(id) {

        return document.getElementById(id);

    }



    try {

        urls = chrome.extension.getBackgroundPage().urls;

        thumbs = chrome.extension.getBackgroundPage().thumbs;

    } catch (e) {

        console.log(e);

        return;

    }

    if (!!localStorage.rows) {

        ROWS_COUNT = +localStorage.rows;

    }

    if (!!localStorage.col) {

        COLUMNS_COUNT = +localStorage.col;

    }

    function pagesNumberChanged(e, id) {

        var s = e.currentTarget;

        if (id === 0) {

            ROWS_COUNT = s.options[s.selectedIndex].value;

            localStorage.rows = ROWS_COUNT;

        } else {

            COLUMNS_COUNT = s.options[s.selectedIndex].value;

            localStorage.col = COLUMNS_COUNT;

        }

    }

    function onDrag(e) {

        if (e.screenX > 0 || e.screenY > 0) {

            var TargetPosX,

                TargetPosY,

                modificator,

                i,

                prevPage,

                moved,

                tmpPosX,

                tmpPosY,

                p_left = e.x - _offsetX,

                p_top = e.y - _offsetY,

                col = Math.floor((p_left + PAGE_WIDTH / 2 + DELTA) / (PAGE_WIDTH + DELTA)),

                row = Math.floor((p_top + PAGE_HEIGHT / 2 + DELTA) / (PAGE_HEIGHT + DELTA)),

                position = row * COLUMNS_COUNT + col;

            dragPage.style.left = p_left;

            dragPage.style.top = p_top;

            if ((position >= 0) && (position < ROWS_COUNT * COLUMNS_COUNT) && (position !== dragPage.index)) {

                if (Math.abs(p_left - col * (PAGE_WIDTH + DELTA)) < PAGE_WIDTH / 2) {

                    TargetPosX = pagePosX;

                    TargetPosY = pagePosY;

                    modificator = (position > dragPage.index) ? 1 : -1;

                    i = dragPage.index;

                    //prevPage = dragPage;

                    do {

                        i += modificator;

                        moved = d('page' + i);

                        tmpPosX = parseFloat(moved.style.left);

                        tmpPosY = parseFloat(moved.style.top);

                        moved.style.left = TargetPosX;

                        moved.style.top = TargetPosY;

                        TargetPosX = tmpPosX;

                        TargetPosY = tmpPosY;

                        moved.setAttribute('id', 'page' + (i - modificator));

                        moved.index = i - modificator;

                    } while (i !== position);

                    pagePosX = TargetPosX;

                    pagePosY = TargetPosY;

                    dragPage.index = position;

                    dragPage.setAttribute('id', 'page' + position);

                }

            }

        }

    }

    function stopDrag(e) {

        document.ondrag = null;

        document.ondragend = null;

        dragPage.ondragover = null;

        dragPage.style.zIndex = null;

        dragPage.className = 'page';

        dragPage.style.left = pagePosX;

        dragPage.style.top = pagePosY;

        dragPage.style.width = parseFloat(dragPage.style.width) - 15;

        dragPage.style.height = parseFloat(dragPage.style.height) - 15;

        chrome.extension.getBackgroundPage().swap(lastPosition, dragPage.index);

        lastPosition = null;

    }

    function PrepareDrag(e) {

        dragPage = e.target.parentElement.parentElement;

        if (dragPage.getAttribute('class') === 'page') {

            lastPosition = dragPage.index;

            dragPage.className = 'page draged';

            dragPage.style.zIndex = 1000;

            pagePosX = parseFloat(dragPage.style.left);

            pagePosY = parseFloat(dragPage.style.top);

            _offsetX = e.x - pagePosX;

            _offsetY = e.y - pagePosY;

            dragPage.style.width = parseFloat(dragPage.style.width) + 15;

            dragPage.style.height = parseFloat(dragPage.style.height) + 15;

            document.ondrag = onDrag;

            document.ondragend = stopDrag;

        }

    }

    function showEditForm() {

        currentEditPage.appendChild(edit);

        setTimeout(function () {

            currentEditPage.className = 'page turned';

        }, 10);

    }

    function hideEditForm() {

        currentEditPage.className = 'page';

        currentEditPage = null;

    }

    function toggleEditForm(page) {

        if (!currentEditPage) {

            currentEditPage = page;

            showEditForm();

            return;

        }

        if (currentEditPage && page !== currentEditPage) {

            hideEditForm();

            currentEditPage = page;

            var hold = setTimeout(function () {

                showEditForm(currentEditPage);

            }, 300);

        }

    }

    function removePage(page) {

        chrome.extension.getBackgroundPage().remove(page.index);

        page.firstElementChild.firstElementChild.removeAttribute('href');

        page.style.webkitTransform = "scale(0.3)";

        var hold = setTimeout(function () {

            //page.lastElementChild.lastElementChild.setAttribute('title',slots[i].title);

            page.firstElementChild.firstElementChild.lastElementChild.style.background = '';

            page.onclick = function (e) {

                if (e.button === 0) {

                    toggleEditForm(e.currentTarget);

                }

            };

            page.style.webkitTransform = "scale(1)";

        }, 200);

    }

    function calcSize() {

        var _width = window.innerWidth,

            _height = window.innerHeight,

            PROPORTION = _height / _width,

            setstyle;

        PAGE_WIDTH = (_width - (DELTA * (COLUMNS_COUNT + 1))) / COLUMNS_COUNT;

        PAGE_HEIGHT = PAGE_WIDTH * PROPORTION;

        if (PAGE_HEIGHT * ROWS_COUNT + ((ROWS_COUNT + 1) * DELTA) > _height) {

            PAGE_HEIGHT = (_height - (DELTA * (ROWS_COUNT + 1))) / ROWS_COUNT;

            PAGE_WIDTH = PAGE_HEIGHT / PROPORTION;

        }

        setstyle = set.style;

        setstyle.width = (PAGE_WIDTH + DELTA) * COLUMNS_COUNT - DELTA;

        setstyle.height = (PAGE_HEIGHT + DELTA) * ROWS_COUNT - DELTA;

        grad_radius = Math.sqrt(PAGE_WIDTH * PAGE_WIDTH / 4 + PAGE_HEIGHT * PAGE_HEIGHT / 3);

        edit.style.width = PAGE_WIDTH;

        edit.style.height = PAGE_HEIGHT;

    }

    function updatePageThumb(slotIndex, page) {

        if (!page) {

            page = d('page' + slotIndex);

        }

        if (!!urls[slotIndex]) {

            page.firstElementChild.firstElementChild.setAttribute('href', urls[slotIndex]);

            //page.lastElementChild.lastElementChild.setAttribute('title',slots[i].title);

            page.firstElementChild.firstElementChild.lastElementChild.style.background = 'URL(' + thumbs[urls[slotIndex]] + ')';

        }

    }

    function pageClickHandler(event) {

        var page, _left, _top;

        if (event.button === 0) {

            try {

                page = event.target.parentElement.parentElement.parentElement;

            } catch (error) {

                //do nothing. because it seems just any of top elements was clicked.

            }

            if (event.target.className === 'thumbnail' && event.target.hasAttribute('style')) {

                _left = set.offsetLeft;

                _top = set.offsetTop;

                page.style.zIndex = 1000;

                page.style.left = -_left;

                page.style.top = -_top;

                page.style.width = window.innerWidth;

                page.style.height = window.innerHeight;

                event.target.style['-webkit-border-radius'] = '0';

            } else if (page.className === 'page') { toggleEditForm(page); }

        }

    }

    function createPages() {

        calcSize();

        var link = document.createElement("a"),

            bgradient = document.createElement("div"),

            logo = document.createElement("div"),

            thumbnail = document.createElement("div"),

            pagefliper = document.createElement("div"),

            thumbnailnode = document.createElement("div"),

            styles = document.styleSheets[1],

            i,

            j,

            index,

            leftPos,

            topPos,

            page;

        link.setAttribute("class", "link");

        bgradient.setAttribute("class", "backgradient");

        link.appendChild(bgradient);

        logo.setAttribute("class", "logo");

        link.appendChild(logo);

        thumbnail.setAttribute("class", "thumbnail");

        link.appendChild(thumbnail);

        pagefliper.setAttribute("class", "fliper");

        pagefliper.appendChild(link);

        thumbnailnode.setAttribute("class", "page");

        thumbnailnode.appendChild(pagefliper);

        for (i = 0; i < styles.cssRules.length; i++) {

            if (styles.cssRules[i].selectorText.indexOf(".backgradient") > -1) {

                styles.cssRules[i].style.background = '-webkit-gradient(radial, center top, 5, center 30%, ' +

                    grad_radius + ', from(#000065), to(#000010))';

            }

        }

        index = 0;

        for (i = 0; i < ROWS_COUNT; i++) {

            for (j = 0; j < COLUMNS_COUNT; j++) {

                leftPos = (j * (PAGE_WIDTH + DELTA));

                topPos = (i * (PAGE_HEIGHT + DELTA));

                page = thumbnailnode.cloneNode(true);

                page.setAttribute('id', 'page' + index);

                page.style.width = PAGE_WIDTH;

                page.style.height = PAGE_HEIGHT;

                page.style.left = leftPos;

                page.style.top = topPos;

                page.index = index;

                set.appendChild(page);

                updatePageThumb(index, page);

                index++;

            }

        }

        page.firstElementChild.appendChild(edit);

        edit.onclick = function (e) { e.stopPropagation(); };

        edit_cancel.onclick = function (e) {

            hideEditForm();

        };

        edit_ok.onclick = editPage;

        tabs.onclick = expandNode;

        bookmarks.onclick = expandNode;

        history.onclick = expandNode;

        document.onclick = pageClickHandler;

        document.ondragstart = PrepareDrag;

    }

    function setPagesSize() {

        calcSize();

        var styles = document.styleSheets[1], i, j, index, leftPos, topPos, pagestyle;

        for (i = 0; i < styles.cssRules.length; i++) {

            if (styles.cssRules[i].selectorText.indexOf(".backgradient") > -1) {

                styles.cssRules[i].style.background = '-webkit-gradient(radial, center top, 5, center 30%, ' +

                    grad_radius + ', from(#000065), to(#000010))';

            }

        }

        index = 1;

        for (i = 0; i < ROWS_COUNT; i++) {

            for (j = 0; j < COLUMNS_COUNT; j++) {

                leftPos = j * (PAGE_WIDTH + DELTA);

                topPos = i * (PAGE_HEIGHT + DELTA);

                pagestyle = d('page' + index).style;

                pagestyle.left = leftPos;

                pagestyle.top = topPos;

                pagestyle.width = PAGE_WIDTH;

                pagestyle.height = PAGE_HEIGHT;

                index++;

            }

        }

    }

    function expandNode(e) {

        var node = this.nextElementSibling,

            protocol = /^https?:/,

            i,

            j,

            tabs,

            item;

        if (node.childElementCount) {

            node.style.display = (node.style.display === "none") ? "block" : "none";

        } else {

            chrome.windows.getAll({populate: true}, function (windows) {

                for (i = 0; i < windows.length; i++) {

                    tabs = windows[i].tabs;

                    for (j = 0; j < tabs.length; j++) {

                        if (protocol.test(tabs[j].url)) {

                            item = document.createElement('div');

                            item.style['background-image'] = "URL(" + tabs[j].favIconUrl + ")";

                            item.setAttribute("class", "item");

                            item.tabId = tabs[j].id;

                            item.url = tabs[j].url;

                            item.innerHTML = "<nobr>" + tabs[j].title + "</nobr>";

                            // TODO: delegate

                            item.onclick = function () {

                                if (typeof currentItem === "undefined") {

                                    currentItem = this;

                                } else {

                                    currentItem.firstChild.className = null;

                                    currentItem = this;

                                }

                                this.firstChild.className = "selected";

                                link_url.value = this.url;

                            };

                            node.appendChild(item);

                        }

                    }

                }

            });

            node.style.display = "block";

        }

    }

    function editPage(e) {

        chrome.extension.getBackgroundPage().editPage(currentItem.tabId, currentEditPage.index);

        hideEditForm();

    }

    window.onload = function () {

        var _width = window.innerWidth,

            _height = window.innerHeight;

        tabs.innerText = chrome.i18n.getMessage("fn_tabs");

        bookmarks.innerText = chrome.i18n.getMessage("fn_bookmarks");

        d('history').innerText = chrome.i18n.getMessage("fn_history");

        edit_cancel.value = chrome.i18n.getMessage("mb_cancal");

        function hacks() {

            window.onresize = function () {

                if (!set.hasChildNodes()) {

                    createPages();

                } else { setPagesSize(); }

            };

            if (_width <= 1 || _height <= 1) {

                console.log("Hack is here!");// Ещё иногда, при открытии таба, объект window имеет неправильный размер

                //window.onresize();                // <- Поэтому используем "костыль".

                reportError("window_size");

            } else { createPages(); }

        }

        try {

            if (!urls.length) {

                chrome.extension.getBackgroundPage().subscribe(hacks);

            } else { hacks(); }

        } catch (e) {

            console.log(e);

            return;

        }

    };

    optionsbutton.onclick = function () {

        if (!OptionsMenu) {

            selectRows.selectedIndex = ROWS_COUNT - 2;

            selectCols.selectedIndex = COLUMNS_COUNT - 3;

            options.style.display = "block";

            OptionsMenu = !OptionsMenu;

        } else {

            options.style.display = "none";

            OptionsMenu = !OptionsMenu;

        }

    };



    function reportError(type) {

        var mess, line;

        if (reports === null) {

            mess = document.createElement("div");

            reports = footer.appendChild(mess);

        }

        line = document.createElement("p");

        line.innerText = chrome.i18n.getMessage(type);

        reports.appendChild(line);

    }

    chrome.extension.onRequest.addListener(

        function (request, sender, sendResponse) {

            if (sender.id) {

                switch (request.action) {

                case "updatePageThumb":

                    updatePageThumb(request.params.index);

                    break;

                }

            }

        }

    );

}