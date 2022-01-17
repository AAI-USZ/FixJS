function (initPhoto) {

    var flickrPhoto = initPhoto;

    Object.defineProperty(this, "flickrPhoto", {

        get: function () {

            return flickrPhoto;

        },

        set: function (photo) {

            flickrPhoto = photo;

            this.setBindingProperties();

        }

    });



    var flickrPhotoSizes = '';

    Object.defineProperty(this, "flickrPhotoSizes", {

        get: function () {

            return flickrPhotoSizes;

        },

        set: function (photoSizes) {

            flickrPhotoSizes = photoSizes;

            this.setSizeBindingProperties();

        }

    });



    var flickrInfo = undefined;

    Object.defineProperty(this, "flickrInfo", {

        get: function () {

            return flickrInfo;

        },

        set: function (info) {

            flickrInfo = info;

            this.setBindingProperties();

        }

    });



    this.setBindingProperties = function () {

        this.setTitle();

        this.setSubTitle();

        this.setBackgroundImage();

        this.setBackgroundImageLarge();

        this.setBackgroundImageSmall();

        this.setContent();

        this.setDescription();

        this.setGroup();

    }



    // these methods are used if specific sizes are needed

    this.setSizeBindingProperties = function () {

    }



    // these next methods are used for data binding

    var group = undefined;

    this.setGroup = function () {

        // key: "group1", 

        //title: "Group Title: 1", 

        //subtitle: "Group Subtitle: 1",

        //backgroundImage: darkGray, 

        //description: groupDescription



        var photoTakenDate = this.getPhotoTakenDate();

        if (photoTakenDate != '') {

            var groupObject = {};

            var day = photoTakenDate.getDate();

            if (day < 10) {

                day = '0' + day;

            }



            var month = photoTakenDate.getMonth();

            if (month < 10) {

                month = '0' + month;

            }



            groupObject.key = '' + month + photoTakenDate.getFullYear();

            groupObject.title = this.getMonthTaken() + ' ' + photoTakenDate.getFullYear();

            groupObject.subtitle = '';

            groupObject.description = '';



            this.group = groupObject;



            this.group.backgroundImage = MetroFlickrViewer.FlickrHandler.getGroupBackgroundImage(groupObject.key);

        }



        return '';

    }



    this.title = undefined;

    this.setTitle = function () {

        this.title = this.getFormattedPhotoDate();

    }



    this.subtitle = undefined;

    this.setSubTitle = function () {

        if (this.flickrInfo != undefined) {

            this.subtitle = this.flickrInfo.title._content;

        }

    }



    this.description = undefined;

    this.setDescription = function () {

        if (this.flickrInfo != undefined) {

            this.description = this.flickrInfo.description._content;

        }

    }



    this.content = undefined;

    this.setContent = function () {

        if (this.flickrInfo != undefined) {

            this.content = this.flickrInfo.description._content;

        }

    }



    this.currentSize = undefined;

    this.backgroundImage = undefined;

    this.setBackgroundImage = function () {

        //t	thumbnail, 100 on longest side

        //m	small, 240 on longest side

        //n	small, 320 on longest side

        //-	medium, 500 on longest side

        //z	medium 640, 640 on longest side

        var sizes = new Array('t', 'm', 'n');// var sizes = new Array('t', 'm', 'n', '-', 'z');

        // http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

        this.currentSize = sizes[Math.floor(Math.random() * sizes.length)]

        this.backgroundImage = 'http://farm' + this.flickrPhoto.farm + '.staticflickr.com/' + this.flickrPhoto.server + '/' + this.flickrPhoto.id + '_' + this.flickrPhoto.secret + '_' + this.currentSize + '.jpg';

    }



    this.backgroundImageLarge = undefined;

    this.setBackgroundImageLarge = function () {

        var size = 'b';

        // http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg



        this.backgroundImageLarge = 'http://farm' + this.flickrPhoto.farm + '.staticflickr.com/' + this.flickrPhoto.server + '/' + this.flickrPhoto.id + '_' + this.flickrPhoto.secret + '_' + size + '.jpg';

    }



    this.backgroundImageSmall = undefined;

    this.setBackgroundImageSmall = function () {

        var size = 't';

        // http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg



        this.backgroundImageSmall = 'http://farm' + this.flickrPhoto.farm + '.staticflickr.com/' + this.flickrPhoto.server + '/' + this.flickrPhoto.id + '_' + this.flickrPhoto.secret + '_' + size + '.jpg';

    }



    // utility functions

    this.getPhotoTakenDate = function () {

        if (this.flickrInfo != undefined) {

            var dateParts = this.flickrInfo.dates.taken.split(' ');

            var yearMonthDay = dateParts[0].split('-');

            var hoursMinutesSeconds = dateParts[1].split(':');

            var date = new Date(yearMonthDay[0],

                                        yearMonthDay[1],

                                        yearMonthDay[2],

                                        hoursMinutesSeconds[0],

                                        hoursMinutesSeconds[1],

                                        hoursMinutesSeconds[2]);



            return date;

        }



        return '';

    }



    this.getFormattedPhotoDate = function () {

        var date = this.getPhotoTakenDate();



        if (date != '') {

            var day = date.getDate();

            var sup = '';

            if (day == 1 || day == 21 || day == 31) {

                sup = "st";

            }

            else if (day == 2 || day == 22) {

                sup = "nd";

            }

            else if (day == 3 || day == 23) {

                sup = "rd";

            }

            else {

                sup = "th";

            }



            // return this.getMonthTaken() + ' ' + day + sup + ", " + date.getFullYear();

            return 'taken the ' + day + sup + ' of ' + this.getMonthTaken() + ' ' + date.getFullYear();

        }



        return '';

    },



    this.getMonthTaken = function () {

        var date = this.getPhotoTakenDate();



        var m_names = new Array("January", "February", "March",

            "April", "May", "June", "July", "August", "September",

            "October", "November", "December");



        return m_names[date.getMonth()]

    }



    this.toJSON = function (key) {

        var replacement = new Object();

        replacement.flickrPhoto = this.flickrPhoto;

        replacement.flickrPhotoSizes = this.flickrPhotoSizes;

        replacement.flickrInfo = this.flickrInfo;



        return replacement;

    };

}