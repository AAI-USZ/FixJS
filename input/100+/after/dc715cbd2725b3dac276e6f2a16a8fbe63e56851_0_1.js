function() {
    var $body = $('body');
    
    // Skip this code if we aren't on a book page
    if (!$body.hasClass('book')) return;
    
    if ($body.hasClass('search')) {
        // Handle the search box
        $('#book-search').tokenInput("/admin/books/search", {
            overlayHintText: 'Search by title, author, ISBN or accession number',
            tokenLimit: 1,
            addClass: "fill",
            allowCustom: true,
            propertyToSearch: "text",
            addFormatter: function(query) { return "<li>Add a new book - <strong>" + escapeHTML(query) + "</strong></li>" },
            onAdd: function(item) {
                $(this).tokenInput("clear");
                if (item.id) {
                    // Redirect to the edit page
                    window.location.href = '/admin/books/' + item.id + '/edit'
                }
                else {
                    // If the ID is null, redirect to the add page, with the title preset
                    window.location.href = '/admin/books/new?title=' + encodeURIComponent(item.name)
                }
            }
        });
    }
    
    // Handle the editions and copies page
    if ($body.hasClass('editions')) {
        // Convert the tables to editable ones
        var $editionTable = $('#edition-table')
        $editionTable.itemTable({
            objectName: 'edition',
            addLinkText: 'New Edition',
            selectable: true,
            columns: [
                {
                    name: 'ISBN',
                    field: 'isbn'
                },
                {
                    name: 'Format',
                    field: 'format_name',
                    type: 'autocomplete',
                    sourceURL: '/admin/formats',
                    autocompleteSettings: { searchOnFocus: true }
                },
                {
                    name: 'Publisher',
                    field: 'publisher_name',
                    type: 'autocomplete',
                    sourceURL: '/admin/publishers',
                    default_val: $editionTable.data('publisher')
                },
                {
                    name: 'Language',
                    field: 'language_name',
                    type: 'autocomplete',
                    sourceURL: '/admin/languages',
                    default_val: 'English',
                    autocompleteSettings: { searchOnFocus: true }
                }
            ]
        });
        
        // Auto add a used copy after an edition is added
        $editionTable.on("addRow", function(e, data) {
            $copyTable.one("tableLoad", function() {
                $copyTable.closest('.table-wrapper').find('.add-link').click();
            });
        });
        
        // When the edition changes, construct copies tables
        var $copyTable = $('#copy-table');
        var $newCopyTable = $('#new-copy-table');
        
        var editionURL = $editionTable.data("url")
        $editionTable.on("selectionChange", function(e, id) {
            $copyTable.add($newCopyTable).empty();
            if (!id) {
                $copyTable.add($newCopyTable).parent().next('.add-container').remove();
                return;
            }
            
            $copyTable.itemTable({
                url: editionURL + '/' + id + '/copies',
                extraParams: {used: true},
                objectName: 'copy',
                addLinkText: 'Add Copy',
                initialLoad: true,
                columns: [
                    {
                        name: 'Accession Number',
                        field: 'accession_id',
                        type: 'read_only'
                    },
                    {
                        name: 'Condition',
                        field: 'condition_rating',
                        multilineLabel: true,
                        type: 'rating'
                    },
                    {
                        name: 'Condition Description',
                        multilineLabel: true,
                        field: 'condition_description'
                    },
                    {
                        name: 'Price',
                        field: 'formatted_price',
                        raw: 'price'
                    }
                ]
            });
            
            $newCopyTable.itemTable({
                url: editionURL + '/' + id + '/copies',
                extraParams: {new: true},
                objectName: 'copy',
                addLinkText: 'Add New Copy',
                initialLoad: true,
                columns: [
                    {
                        name: 'Accession Number',
                        field: 'accession_id',
                        type: 'read_only'
                    },
                    {
                        name: 'Price',
                        field: 'formatted_price',
                        raw: 'price'
                    },
                    {
                        name: 'Number',
                        field: 'number',
                        numeric: true,
                        default_val: "0"
                    },
                    {
                        name: 'Limited Copies',
                        field: 'limited_copies',
                        type: 'boolean',
                        multilineLabel: true,
                        displayCallback: function(data) {
                            return data ? "Limited" : "Unlimited";
                        }
                    }
                ]
            });
        });
        
        // Create a popup for the accession ID
        var $newCopyMsg = $('<div class="new-copy-dialog dialog"></div>');
        $('<p>Copy accession number:</p>').appendTo($newCopyMsg);
        var $accMsg = $('<p class="acc"></p>').appendTo($newCopyMsg);
        $('<a class="minor-button" href="#">Okay</a>').click(function(e) {
           e.preventDefault();
           $.unblockUI();
        }).appendTo($newCopyMsg);
        
        $copyTable.add($newCopyTable).on("addRow", function(e, data) {
            $(this).one("unblock", function() {
                $accMsg.text(data.accession_id)
                $.blockUI({
                    message: $newCopyMsg,
                    css: { top: '30%' }
                });
            });
        });
    }
    
    // Skip the remaining code if we aren't on a book form page
    if (!$body.hasClass('form')) return;
    
    // Autocompletes
    var singleAutocompleteSettings = {
        tokenLimit: 1,
        addClass: "fill thin",
        allowCustom: true,
        tokenValue: "name",
        textPrePopulate: true
    }
    var tagAutocompleteSettings = {
        allowCustom: true,
        addClass: "thin",
        tokenValue: "name",
        preventDuplicates: true,
        dataPrepopulate: true
    }
    var $authorNameInput = $('#book_author_name').tokenInput("/admin/authors.json", singleAutocompleteSettings);
    $('#book_illustrator_name').tokenInput("/admin/illustrators.json", singleAutocompleteSettings);
    $('#book_publisher_name').tokenInput("/admin/publishers.json", singleAutocompleteSettings);
    $('#book_country_name').tokenInput("/admin/countries.json", singleAutocompleteSettings);
    $('#book_collection_list').tokenInput("/admin/collections.json", tagAutocompleteSettings);
    $('#book_book_tag_list').tokenInput("/admin/book_tags.json", tagAutocompleteSettings);
    
    // Function to handle adding options to select lists
    function allowOptionAdding($input, object_name, url, data_container) {
        $input.appendOption("add", "Add").on('change', function() {
            var val = $input.val();
            
            if (val == "add") {
                var name = prompt("Enter the name of the " + object_name);
                if (name) {
                    $input.prop("disabled", true);
                    $.ajaxCall(url, {
                        method: "POST",
                        data: {name: name},
                        dataContainer: data_container,
                        success: function(data) {
                            $input.find('option[value=add]').before(makeOption(data.id, data.name));
                            $input.val(data.id).prop("disabled", false);
                        },
                        error: function() {
                            $input.val($input.find('option:first').attr('value')).prop("disabled", false);
                        }
                    });
                }
                else {
                    $input.val($input.find('option:first').attr('value'));
                }
            }
        });
    }
    
    allowOptionAdding($('#book_book_type_id'), 'book type', '/admin/book_types', 'book_type');
    
    var $awardList = $('#award-field-list ul');
    // Check when a award type selector is changed
    $awardList.on("change", ".award_type", function() {
        var $awardType = $(this);
        award_type = $awardType.val();
        var $awards = $awardType.next('select');
        $awards.empty();
        
        // Add a new award type with a prompt and an ajax call
        if (award_type == "add") {
            var name = prompt("Enter the name of the award");
            if (name) {
                $awardType.prop("disabled", true);
                $.ajaxCall("/admin/award_types", {
                    method: "POST",
                    data: {name: name},
                    dataContainer: "award_type",
                    success: function(data) {
                        $awardType.find('option[value=add]').before(makeOption(data.id, data.name));
                        $awardType.val(data.id).prop("disabled", false);
                        $awardType.change();
                    },
                    error: function() {
                        $awardType.val("").prop("disabled", false);
                        $awardType.change();
                    }
                });
            }
            else {
                $awardType.val("");
                $awardType.change();
            }
        }
        // Or change the dependent award names selector when the award type is changed
        else if (award_type) {
            $awards.appendOption("", "Loading...");
            $.get('/admin/award_types/' + award_type + '/awards.json', function(data) {
                $awards.empty();
                $.each(data, function(i, val) {
                    $awards.appendOption(val.id, val.name);
                })
                $awards.appendOption("add", "Add")
                $awardType.trigger("changed");
            })
        }
    });
    
    // Check for a change in the award name selector
    $awardList.on("change", ".award_name", function() {
        var $awardName = $(this);
        var $awardType = $awardName.prev('select');
        award_type = $awardType.val();
        
        // Add a new award name to the selected award type with a prompt and an ajax call
        if ($awardName.val() == "add" && award_type && award_type != "add") {
            var name = prompt("Enter the description to add for '" + $awardType.find('option:selected').text() + "'");
            if (name) {
                $awardName.prop("disabled", true);
                $.ajaxCall("/admin/award_types/" + award_type + "/awards", {
                    method: "POST",
                    data: {name: name},
                    dataContainer: "award",
                    success: function(data) {
                        $awardName.find('option[value=add]').before(makeOption(data.id, data.name));
                        $awardName.val(data.id).prop("disabled", false);
                    },
                    error: function() {
                        $awardName.val($awardName.find("option:first").val()).prop("disabled", false);
                    }
                });
            }
            else {
                $awardName.val($awardName.find("option:first").val());
            }
        }
    });
    // Initialize by checking each award type selector
    $awardList.find('.award_type').each(function() {
        // Add an 'add' option
        var $this = $(this).appendOption("add", "Add");
        var $awardName = $this.next('select');
        var type = $awardName.val();
        // Refresh the dependent award name selector, but restore it's original selected value
        // This is to handle cases where the browser keeps the selector value the same as
        // what was previously selected by the user after a page refresh
        $this.one("changed", function() {
            $awardName.val(type);
        }).change();
    });
    
    function checkFirstAward() {
        $awardList.find('li:visible').removeClass('first').first().addClass('first');
    }
    
    // Handle award removal [set the award name value to ""]
    $awardList.on("click", ".remove-link", function(e) {
        var $award = $(this).parent('li');
        $award.hide();
        $award.find('.award_type').val("");
        $award.find('.award_name').empty().appendOption("", "Removed").val("");
        checkFirstAward();
        e.preventDefault();
    });
    
    // Create an initial template for an award section by cloning the first award section and
    // reseting it
    var $awardTemplate = $awardList.find('li:first').clone()
        .find('.award_type')
            .find('option')
                .removeAttr("selected")
                .end()
            .val("")
            .end()
        .find('.award_name')
            .attr('name', 'book[award_attributes][][award_id]')
            .empty()
            .end()
        .find('.award_year')
            .attr('name', 'book[award_attributes][][year]')
            .val("")
            .end()
        .find('input[type=hidden]')
            .remove()
            .end();
    
    // Handle adding awards
    $('#add-award-link').click(function(e) {
        $awardTemplate.clone().appendTo($awardList);
        checkFirstAward();
        e.preventDefault();
    });
    
    
    // Handle switching descriptions
    var $descFields = $('#description-fields');
    var $descButtons = $descFields.find('.buttons');
    var $descTitle = $descFields.find("#description-title");
    var $descContent = $descFields.find("#description-content");
    
    // Function to save the currently edited description
    function saveCurrentDescription() {
        var number = parseInt($descButtons.find(".selected").text(), 10);
        var $storedDesc = $descFields.find("#stored-desc-" + number);
        $storedDesc.find(".title").val($descTitle.val());
        $storedDesc.find(".content").val($descContent.val());
    }
    
    $descTitle.add($descContent).change(saveCurrentDescription);
    
    $descButtons.on("click", "a", function(e) {
        e.preventDefault();
        var $button = $(this);
        
        // Skip if we are already editing the clicked description
        if ($button.hasClass("selected")) return;
        
        // Add a new description
        if ($button.hasClass("add")) {
            saveCurrentDescription();
            
            // Find the new description number
            var number = (parseInt($button.prev("a").text(), 10) || 0) + 1;
            
            // Create new storage fields
            $('<div id="stored-desc-' + number + '"></div>')
                .append('<input class="title" type="hidden" value="" name="book[description_attributes][][title]" />')
                .append('<input class="content" type="hidden" value="" name="book[description_attributes][][content]" />')
                .appendTo($descFields);
            
            // Clear the current fields
            $descTitle.val('');
            $descContent.val('');
            
            // Add a new button and select it
            $descButtons.find("a.selected").removeClass("selected");
            $button.before('<a href="#" class="selected">' + number + '</a>');
            
            // Change the content textarea height
            $descContent.css("height", ((number + 1) * 20) + "px")
            
            // Focus on the title
            $descTitle.focus();
        }
        
        // Switch description numbers
        else {
            saveCurrentDescription();
            
            // Load the chosen description values
            var number = parseInt($button.text(), 10);
            var $storedDesc = $descFields.find("#stored-desc-" + number);
            $descTitle.val($storedDesc.find(".title").val());
            $descContent.val($storedDesc.find(".content").val());
            
            // Switch the selected button class
            $descButtons.find("a.selected").removeClass("selected");
            $button.addClass("selected");
        }
    });
    
    // Save current description before saving the book
    $('.book form').submit(function() {
        saveCurrentDescription();
    });
    
    // Handle the showing and hiding of the cover edit menu
    var $cover = $('.cover:first');
    var $coverMenu = $cover.find("#edit-cover-list");
    var $editLink = $cover.find("#edit-cover-link");
    var coverMenuTimer;
    $editLink.hoverIntent(function() {
        if ($coverMenu.hasClass("shown")) return;
        $coverMenu.stop().hide().css('opacity', 1).addClass("shown").fadeIn();
    }, function(){}).hover(function() {
        clearTimeout(coverMenuTimer);
    }, function() {
        coverMenuTimer = setTimeout(function() {
            $coverMenu.fadeOut().removeClass("shown");
        }, 50);
    }).click(function() {
        e.preventDefault();
    });
    
    $coverMenu.hover(function() {
        clearTimeout(coverMenuTimer);
    }, function() {
        coverMenuTimer = setTimeout(function() {
            $coverMenu.fadeOut().removeClass("shown");
        }, 50);
    });
    
    // Handle cover images
    var $imageDialog = $('<section id="image-dialog"></section>');
    var $progressCont = $('<div id="progress-bar"></div>').hide().appendTo($imageDialog);
    var $progressBar = $('<div></div>').appendTo($progressCont);
    var $progressText = $('<span></span>').appendTo($progressCont);
    var $errorMsg = $('<p class="error"></p>').hide().appendTo($imageDialog);
    var $dialogInfo = $('<p>Choose a file to upload. The image can be up to 2 MB and must be a JPEG, GIF or PNG file</p>').appendTo($imageDialog);
    var jqXHR = null;
    var $cancel = $('<a href="#" class="cancel minor-button">Cancel</a>').click(function(e) {
            e.preventDefault();
            if (jqXHR) jqXHR.abort();
            $imageDialog.trigger('exit');
        }).appendTo($imageDialog);
    
    // Add a binding for the Escape key
    $imageDialog.keyup(function(e) {
        if (e.keyCode == KEYCODE_ESC) $cancel.click();
    });
    
    var initDialog = function(errMsg) {
        $progressCont.hide();
        $imageDialog.find('input').show();
        if (errMsg) {
            $errorMsg.text(errMsg).show()
        }
        else {
            $errorMsg.hide();
        }
        $dialogInfo.show();
        $cancel.show();
    };
    
    // Set up the uploader in the dialog
    $('<input type="file" class="image-uploader" name="image_file" />').fileupload({
        dataType: 'json',
        url: '/admin/cover_images',
        singeFileUpload: true,
        add: function(e, data) {
            var file = data.files[0];
            if (file.size > (4 * 1024 * 1024)) {
               $errorMsg.text('The file cannot be more than 4 MB').show();
            }
            else if(!include(["jpg","png","gif"],file.name.slice(-3).toLowerCase()) && (file.name.slice(-4).toLowerCase() != 'jpeg')) {
                 $errorMsg.text('The file is not a valid format').show();
            }
            else {
                jqXHR = data.submit();
                $imageDialog.find('input').hide();
                $dialogInfo.hide();
                $errorMsg.hide();
                $progressBar.css('width', '0');
                $progressText.text('0%');
                $progressCont.fadeIn();
            }
        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $progressBar.css('width', progress + '%');
            $progressText.text(progress + '%');
        },
        done: function (e, data) {
            $progressBar.css('width', '100%');
            $progressText.text('100%');
            $imageDialog.find('input').hide();
            $progressCont.fadeOut(function() {
                var jsonData = $.parseJSON(data.jqXHR.responseText);
                $imageDialog.trigger('exit', [jsonData.id, jsonData.url, jsonData.thumb]);
            });
        },
        fail: function (e, data) {
            if (data.errorThrown == "abort") {
                 initDialog('Upload cancelled');
            }
            else {
                initDialog($.parseJSON(data.jqXHR.responseText)[0]);
            }
        }
    }).insertBefore($cancel);
    
    // Handle the image links to add and clear the cover
    var $coverId = $('#book_cover_image_id');
    var $bookTitle = $('#book_title');
    var $removeCoverLink = $('#remove-cover-link');
    var $removeCoverLi = $removeCoverLink.parent("li");
    
    function clearCoverImage() {
        $cover.find('.blank-cover').remove().end()
            .find('img').parent('a').remove();
    }
    
    $('#upload-cover-link').click(function(e) {
        $coverMenu.hide();
        initDialog();
        $.blockUI({message: $imageDialog});
        $imageDialog.one('exit', function(event, id, url, thumb) {
            if (url) {
                clearCoverImage();
                $cover.append('<a href="' + url + '"><img alt="" src="' + thumb + '" /></a>');
                $coverId.attr("name", "book[cover_image_id]").val(id);
                $removeCoverLi.removeClass("disabled");
            }
            $.unblockUI();
        });
        e.preventDefault();
    });
    
    $removeCoverLink.click(function(e) {
        e.preventDefault();
        if ($removeCoverLi.hasClass("disabled")) return;
        $coverMenu.hide();
        clearCoverImage();
        $cover.prepend($('<div class="blank-cover"></div>')
            .append('<p class="title">' + $bookTitle.val() + '</p>')
            .append('<p class="author">' + $authorNameInput.val() + '</p>')
        );
        $removeCoverLi.addClass("disabled");
        $coverId.attr("name", "book[cover_image_id]").val(null);
    });
    
    function coverFromURL(url) {
        if (url) {
            clearCoverImage();
            $cover.append('<a href="' + url + '"><img alt="" src="' + url + '" /></a>')
            $coverId.attr("name", "book[cover_image_url]").val(url);
            $removeCoverLi.removeClass("disabled");
        }
    }
    
    $('#cover-url-link').click(function(e) {
        $coverMenu.hide();
        var url = prompt("Enter the URL of the image:");
        coverFromURL(url);
    });
    
    // Change the cover text (if no image has been selected) when the title is changed
    $bookTitle.change(function() {
        $cover.find(".blank-cover p.title").text($(this).val());
    });
    
    $authorNameInput.change(function() {
        $cover.find(".blank-cover p.author").text($(this).val());
    });
    
    // Handle creating google links
    
    var $ageGoogleLink = $('<a href=#" class="google-link ext">[google]</a>');
    var $awardGoogleLink = $('<a href=#" class="google-link ext">[google]</a>');
    var $ageTo = $('#book_age_to');
    var $awardListContainer = $('#award-field-list');
    
    $bookTitle.add($authorNameInput).change(function() {
        var title = $bookTitle.val();
        if (!title) {
            $ageGoogleLink.add($awardGoogleLink).remove();
        }
        else {
            var author_name = $authorNameInput.val();
            $ageGoogleLink.attr('href', 'http://www.google.com/search?q=' + encodeURIComponent('"' + title + '" ' + author_name + ' age'))
                .insertAfter($ageTo);
            
            $awardGoogleLink.attr('href', 'http://www.google.com/search?q=' + encodeURIComponent('"' + title + '" ' + author_name + ' award'))
                .appendTo($awardListContainer);
        }
    });
    
    // Handle amazon information
    var $sidebar = $('#info-sidebar');
    var $bookList = $sidebar.find('#book-list');
    var $bookInfo = $sidebar.find('#book-info');
    var $bookScroller = $sidebar.find('#book-scroller');
    var $scrollWrapper = $bookScroller.find('.book-list-wrapper');
    
    // Load amazon data
    $bookTitle.change(function() {
        var title = $(this).val();
        
        if (!$.trim(title)) {
            $bookList.empty();
            $bookInfo.empty();
            return;
        }
        
        if (title == $sidebar.data("title")) return;
        $bookInfo.empty();
        $bookList.empty()
        $scrollWrapper.scrollLeft(0);
        $bookScroller.block(blockUILoading);
        $.get('/admin/books/amazon_info.json', {'title': title}, function(data) {
            $bookList.empty();
            
            if (!data.length) {
                $bookScroller.unblock();
                return;
            }
            
            var list_length = 0;
            $sidebar.data("title", title)
            
            $.each(data, function(index, entry) {
                var $coverThumb = $('<div class="cover-thumb" title="' + entry.title + '"></div>')
                    .data('bookInfo', entry)
                    .appendTo($bookList);
                    
                if (entry.thumb) {
                    list_length += parseInt(entry.thumbWidth, 10) + 14;
                    $coverThumb.append('<img src="' + entry.thumb + '" alt="' + entry.title + '" />')
                    .height(entry.thumbHeight)
                    .width(entry.thumbWidth);
                }
                else {
                    list_length += 50 + 14;
                    $coverThumb.height(75)
                    .width(50);
                }
            });
            
            $bookList.css('width', list_length + 'px');
            $bookScroller.unblock();
            $bookList.find('.cover-thumb:first').click();
        });
    });
    
    // Amazon book list scroller
    var $leftScroll = $bookScroller.find('.left-scroll');
    var $rightScroll = $bookScroller.find('.right-scroll');
    var scrollTimer;
    var scrollInterval = 10;
    var direction = 0;
    
    var scrollFunction = function() {
        $scrollWrapper.scrollLeft($scrollWrapper.scrollLeft() + (3 * direction));
    }
    
    $leftScroll.hover(function() {
        direction = -1;
        scrollTimer = setInterval(scrollFunction, scrollInterval)
    }, function() {
        clearInterval(scrollTimer);
    });
    
    $rightScroll.hover(function() {
        direction = 1;
        scrollTimer = setInterval(scrollFunction, scrollInterval)
    }, function() {
        clearInterval(scrollTimer);
    });
    
    // Selection of a book
    $bookList.on('click', '.cover-thumb', function() {
        var $selectedBook = $(this);
        if ($selectedBook.hasClass("selected")) return;
        
        $bookList.find('.cover-thumb.selected').removeClass("selected");
        $selectedBook.addClass("selected");
        
        $bookInfo.empty();
        var currBook = $selectedBook.data('bookInfo');
        
        if (currBook.image) {
            $bookInfo.append($('<li></li>')
                .append($('<div class="cover"></div>')
                    .append('<a href="' + currBook.image + '" target="_blank"><img src="' + currBook.image + '" alt="" /></a>')
                )
                .append($('<div class="use-link-wrapper"></div>')
                    .append('<a href="#" class="use-link">Use</a>')
                    .append(' (' + (currBook.imageWidth || 0) + '&times;' + (currBook.imageHeight || 0) + ')')
                )
            );
        }
            
        $bookInfo
            .appendLi('Title', currBook.title)
            .appendLi('Author', currBook.author)
            .appendLi('Illustrator', currBook.illustrator)
            .appendLi('ISBN', currBook.isbn)
            .appendLi('Publisher', currBook.publisher)
            .appendLi('Publication Date', currBook.publicationDate)
            .appendLi('Age Level', currBook.age)
            .appendLi('Pages', currBook.pages)
            .appendLi('Amazon Page', '<a href="' + currBook.details + '">' + currBook.details + '</a>');
    });
    
    // Handle using amazon images
    $sidebar.on("click", "a.use-link", function(e) {
        var url = $sidebar.find('.cover img').attr('src');
        coverFromURL(url);
        e.preventDefault();
    });
    
    
    $.fn.appendLi = function(title, value, br) {
        br = br || false;
        return $(this).append('<li><strong>' + title + ': </strong>' + (br ? '<br />' : '') + (value || '') + '</li>');
    }
    
    $bookTitle.change();
    
}