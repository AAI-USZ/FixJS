function (e) {
                isMouseDown = false;
                
                // replace shadows and triangle
                $sidebar.find(".sidebar-selection-triangle").css("display", "block");
                $sidebar.find(".scroller-shadow").css("display", "block");
                
                $projectFilesContainer.triggerHandler("scroll");
                $openFilesContainer.triggerHandler("scroll");
                $mainView.off("mousemove.sidebar");
                $body.toggleClass("resizing");
                startingSidebarPosition = $sidebar.width();
            }