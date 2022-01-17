function (title, sections, user, ui, tileBuilder) {

    var self = this;



    this.appRunning = false;

    this.currentApp = "";

    this.user = ko.observable(user);

    this.title = ko.observable(title);

    this.sections = ko.observableArray(sections);



    this.timerId = 0;



    this.onTileOrderChange = function () { }

    this.onTileClick = function (tile) { }



    this.removeTile = function (id) {

        var tile = self.getTile(id);

        ko.utils.arrayForEach(self.sections(), function (section) {

            //ko.utils.arrayRemoveItem(section.tiles(), tile);

            section.tiles.remove(tile);

        });

        $('#' + tile.uniqueId).remove();

        return tile;

    }



    this.getTile = function (id) {

        var foundTile = null;

        ko.utils.arrayFirst(self.sections(), function (section) {

            foundTile = ko.utils.arrayFirst(section.tiles(), function (item) {

                return item.uniqueId == id;

            });

            return foundTile != null;

        });

        return foundTile;

    }



    this.resize = function () {

        //self.resetTiles();

        //self.reflow();

    }



    this.init = function () {

        self.attachTiles();

        //self.reflow();

        self.makeSortable();

        self.animateTiles();

        self.subscribeToChange();

        _.delay(self.showMetroSections, 500);

    }



    this.subscribeToChange = function () {

        ko.utils.arrayForEach(self.sections(), function (section) {

            section.tiles.subscribe(function () {

                self.onTileOrderChange();

            });

        });



    }



    this.loadSectionsFromString = function (tileSerialized) {

        // Format: Section1~weather1,weather.youtube1,youtube|Section2~ie1,ie.



        var sections = ("" + tileSerialized).split("|");

        var sectionArray = [];



        _.each(sections, function (section) {

            var sectionName = _.string.strLeft(section, '~');



            var tiles = _.string.strRight(section, '~').split(".");



            var sectionTiles = [];



            var index = 0;

            _.each(tiles, function (tile) {

                if (tile.length > 0) {

                    var tileId = _.string.strLeft(tile, ",");

                    var tileName = _.string.strRight(tile, ",");



                    if (tileName.length > 0) {

                        var builder = tileBuilder[tileName];

                        if (builder == null) {

                            //console.log("No builder found for tile: " + tileName);

                        }

                        else {

                            var tileParams = builder(tileId);

                            var newTile = new Tile(tileParams, ui, self);

                            newTile.index = index++;

                            sectionTiles.push(newTile);

                        }

                    }

                }

            });



            var newSection = new Section({

                name: sectionName,

                tiles: sectionTiles

            }, self);

            sectionArray.push(newSection);



        });





        self.hideMetroSections();

        self.sections(sectionArray);

        self.init();

    }



    this.toSectionString = function () {

        // Format: Section1~weather1,weather.youtube1,youtube|Section2~ie1,ie.



        return ko.utils.arrayMap(self.sections(), function (section) {

            return section.name() + "~" +

                ko.utils.arrayMap(section.getTilesSorted(), function (tile) {

                    return tile.uniqueId + "," + tile.name;

                }).join(".");

        }).join("|");

    }



    this.hideMetroSections = function () {

        $(ui.metro_sections_selector).hide();

    }



    this.showMetroSections = function () {



        $(ui.metro_sections_selector)

            .css({

                'margin-left': 50,

                'margin-top': 20,

                'opacity': 0

            })

            .show()

            .animate({

                'margin-left': 0,

                'opacity': 1

            }, 500, 'swing');

    }



    this.launchApp = function (id, title, url, loaded) {



        self.hideMetroSections();



        self.appRunning = true;

        self.currentApp = url;



        var iframe = $('<iframe id="' + ui.app_iframe_id + '" frameborder="no" />')

           .css({

               'position': 'absolute',

               'left': "0",

               'top': "0px",

               'width': '100%',

               'height': '100%',

               'z-index': ui.app_iframe_zindex,

               'visibility': 'hidden',

               'background-color': 'white'

           })

           .appendTo(document.body)

           .attr({ 'src': url })

           .load(function () {

               self.hideNavBar();

               loaded();

               $(this).css('visibility', 'visible');

           });





        location.hash = id;

    }



    this.closeApp = function () {

        $('#' + ui.app_iframe_id).remove();

        self.showNavBar();



        this.appRunning = false;

        this.currentApp = "";



        self.showMetroSections();



        location.hash = "";

    }



    this.hideNavBar = function () {

        var navbar = $(ui.navbar);

        navbar

            .css("z-index", ui.navbar_zindex)

            .delay(3000)

            .animate({

                top: -(navbar.height() - 5) + "px"

            }, function () {

                $('#navbar').tooltip('show');

                _.delay(function () {

                    $('#navbar').tooltip('hide');

                }, 10000);

            }).bind("mouseenter", function () {

                navbar

                    .stop(true, true)

                    .animate({

                        top: "0px"

                    });

            }).bind("mouseleave", function () {

                navbar

                    .stop(true, true)

                    .delay(3000)

                    .animate({

                        top: -(navbar.height() - 5) + "px"

                    });

            });

    }



    this.showNavBar = function () {

        var navbar = $(ui.navbar);

        navbar

            .unbind("mouseenter mouseleave")

            .animate({

                top: "0px"

            });

    }



    this.fullscreenAppClosed = function () {

        self.showMetroSections();

    }



    this.animateTiles = function () {

        window.clearInterval(self.timerId);

        self.timerId = window.setInterval(function () {

            $(ui.tile_selector).each(function () {

                var el = $(this);

                var slides = $(ui.tile_content_main_selector, el);

                if (slides.length > 0) {

                    var slideIndex = el.data("slideIndex") || 1;

                    if (slideIndex == slides.length) {

                        slideIndex = 0;

                    }

                    var firstPage = slides.first();

                    firstPage.animate({ marginTop: -(slideIndex * firstPage.height()) }, 500);

                    el.data("slideIndex", ++slideIndex);

                }

            });

        }, ui.tile_content_slide_delay);

    }



    this.attachTiles = function (tiles) {

        ko.utils.arrayForEach(self.sections(), function (section) {

            ko.utils.arrayForEach(section.tiles(), function (tile) {

                tile.attach($('#' + tile.uniqueId));

                tile.onTileClick = function (t) {

                    return self.onTileClick(t);

                }

            });

        });

    }



    this.makeSortable = function () {

        $(ui.trash).droppable({

            tolerance: 'touch',

            over: function (event, o) {

                $(this).animate({ "zoom": "1.5" });

            },

            out: function (event, o) {

                $(this).animate({ "zoom": "1.0" });

            },

            drop: function (event, o) {

                $(this).animate({ "zoom": "1.0" });

                var tileId = o.draggable[0].id;

                self.removeTile(tileId);

            }

        });



        $(ui.metro_section_selector).sortable({

            connectWith: ui.metro_section_selector,

            revert: true,

            distance: 10,

            tolerance: "pointer",

            "opacity": 0.6,

            start: function (event, o) {

                o.item.data("noclick", true);

                $(ui.trash).fadeIn();

            },

            stop: function (event, o) {

                //console.log(o);

                $(ui.trash).fadeOut();



                self.recalcIndex();

                self.onTileOrderChange();



                //self.reflow();

                o.item.data("noclick", false);

            }

        });

    }



    this.getSection = function (uniqueId) {

        return ko.utils.arrayFirst(self.sections(), function (section) {

            return section.uniqueId == uniqueId;

        });

    }



    this.recalcIndex = function () {

        $(ui.metro_section_selector).each(function (sectionIndex, sectionDiv) {

            var section = self.getSection(sectionDiv.id);

            $(ui.tile_selector, sectionDiv).each(function (index, tileDiv) {

                var tileId = tileDiv.id;

                var tileObject = section.getTile(tileId);

                if (tileObject != null) {

                    tileObject.index = index;

                }

                else {

                    var tileFromSomewhere;

                    var containingSection = ko.utils.arrayFirst(self.sections(), function (s) {

                        tileFromSomewhere = ko.utils.arrayFirst(s.tiles(), function (t) {

                            return t.uniqueId == tileId;

                        });

                        return tileFromSomewhere != null;

                    });

                    if (containingSection != null) {

                        containingSection.tiles.remove(tileFromSomewhere);

                    }

                    if (tileFromSomewhere != null) {

                        section.tiles.splice(index, 0, tileFromSomewhere);

                        tileFromSomewhere.index = index;

                        $(tileDiv).remove();

                    }

                }



            });

        });

    }



    //this.resetTiles = function () {

    //    var dynamicSection = $(ui.metro_section_selector + '+.' + ui.metro_section_overflow).each(function () {

    //        var section = $(this);

    //        var prevSection = section.prev();

    //        $(ui.tile_selector, section).appendTo(prevSection);

    //        section.remove();

    //    });

    //}





    //this.reflow = function (fromIndex) {

    //    var metroSectionHeight = $(window).height(); 



    //    $(ui.tile_selector).slice(fromIndex | 0).each(function (index, item) {

    //        var tile = $(item);

    //        var pos = tile.offset();



    //        if (tile.index() > 0 && (pos.top + tile.height()) > metroSectionHeight) {

    //            var mySection = tile.parents(ui.metro_section_selector);

    //            var nextSection = mySection.next();



    //            // If the next section isn't a dynamically created section especially

    //            // made to hold overflowing tiles, then move the tiles to that section.

    //            // otherwise make a new dynamic section.

    //            if (nextSection.length > 0 && nextSection.hasClass(ui.metro_section_overflow)) {

    //                nextSection.prepend(tile);

    //                return _.delay(function () {

    //                    reflow(index + 1)

    //                }, 100);

    //            }

    //            else {

    //                nextSection = $('<div />').addClass(ui.metro_section).addClass(ui.metro_section_overflow);

    //                nextSection.insertAfter(mySection);

    //                //nextSection.appendTo(mySection.parent());

    //                nextSection.prepend(tile);



    //                return _.delay(function () {

    //                    reflow(index + 1)

    //                }, 100);

    //            }

    //        }

    //    });



    //    self.makeSortable();

    //}



    this.splashScreen = function (colorClass, icon, complete) {



        return $("<div/>")

            .addClass(colorClass)

            .css({

                'position': 'absolute',

                'left': -($(window).width() / 4) + 'px',

                'top': $(window).height() / 4,

                'width': $(window).width() / 4 + 'px',

                'height': $(window).height() / 4 + 'px',

                'z-index': ui.splash_screen_zindex,

                'opacity': 0.3

            })

            .appendTo(document.body)

            .animate({

                left: '50px',

                top: '50px',

                'width': $(window).width() - 100 + 'px',

                'height': $(window).height() - 100 + 'px',

                'opacity': 1.0

            }, 500, function () {

                $(this).animate({

                    left: '0px',

                    top: '0px',

                    width: '100%',

                    height: '100%'

                }, 500, function () { complete($(this)) });

            })

            .append(

                $('<img />')

                    .attr('src', icon)

                    .addClass(ui.splash_screen_icon_class)

                    .css({

                        'position': 'absolute',

                        'left': ($(window).width() - 512) / 2,

                        'top': ($(window).height() - 512) / 2

                    })

            );

    }



    this.login = function () {

        self.splashScreen(ui.signin_splash_color, ui.signin_splash_icon, function (div) {

            self.launchApp("Login", "Login", ui.login_page, function () {

                div.fadeOut();

            });

        });

    }



    this.logout = function () {

        self.splashScreen(ui.signin_splash_color, ui.signin_splash_icon, function (div) {

            self.launchApp("Logout", "Logout", ui.logout_page, function () {

                div.fadeOut();

            });

        });

    }



    this.settings = function () {

        if (self.user().isAnonymous)

            self.login();

        else {

            self.splashScreen(ui.settings_splash_color, ui.settings_splash_icon, function (div) {

                self.launchApp("Settings", "Settings", ui.settings_page, function () {

                    div.fadeOut();

                });

            });

        }

    }



    this.apps = function () {

        self.splashScreen(ui.appStore_splash_color, ui.appStore_splash_icon, function (div) {

            self.launchApp("AppStore", "App Store", "AppStore.html", function () {

                div.fadeOut();

            });

        });

    }



    this.switchTheme = function (themename) {

        var classes = $("body").prop("class").split(" ");

        _.each(classes, function (c) {

            if (_.string.startsWith(c, 'theme-'))

                $("body").removeClass(c);

        });



        $("body").addClass(themename);

    }



    this.reload = function () {

        document.location.href = _.string.strLeft(document.location.href, '#');

    }

}