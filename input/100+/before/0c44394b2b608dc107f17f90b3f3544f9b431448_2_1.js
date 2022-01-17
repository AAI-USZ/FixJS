function () {

    var local = WinJS.Application.local;


    var userName = '';
    Object.defineProperty(this, "userName", {

        get: function () {

            return userName;

        },
        set: function (name) {

            userName = name;

        }

    });


    var userId = '';
    Object.defineProperty(this, "userId", {

        get: function () {

            return userId;

        },
        set: function (id) {

            userId = id;

        }

    });



    var data = {

        userName: '',

        photoData: '',

        userId: ''

    };
    Object.defineProperty(this, "data", {

        get: function () {

            return data;

        },
        set: function (d) {

            data = d;

        }

    });



    var fileName = '';
    Object.defineProperty(this, "fileName", {

        get: function () {

            return userName + '.json';

        }

    });



    this.saveData = function () {

        if (MetroFlickrViewer.FlickrUser.userId != '' &&

           MetroFlickrViewer.FlickrUser.userId != undefined &&

           MetroFlickrViewer.FlickrUser.userName != '' &&

           MetroFlickrViewer.FlickrUser.userName != undefined) {

            MetroFlickrViewer.FlickrUser.data.photoData = JSON.stringify(MetroFlickrViewer.FlickrHandler.PhotoHash);

            MetroFlickrViewer.FlickrUser.data.userName = MetroFlickrViewer.FlickrUser.userName;

            MetroFlickrViewer.FlickrUser.data.userId = MetroFlickrViewer.FlickrUser.userId;

            MetroFlickrViewer.FlickrUser.data.currentPage = MetroFlickrViewer.FlickrHandler.CurrentPage;

        } else {

            MetroFlickrViewer.FlickrUser.data = {};

        }



        local.writeText(MetroFlickrViewer.FlickrUser.fileName, JSON.stringify(MetroFlickrViewer.FlickrUser.data)).then(

            function (result) {

            },

            function (errorMessage) {

                console.log(errorMessage);

                return false;

            }

        );

    };



    this.loadData = function () {

        return new WinJS.Promise(function (complete) {

            local.readText(MetroFlickrViewer.FlickrUser.fileName).then(

                function (data) {

                    if (data != undefined && data != '') {

                        MetroFlickrViewer.FlickrUser.data = JSON.parse(data);



                        if (data != '{}') {

                            MetroFlickrViewer.FlickrHandler.PhotoHash = JSON.parse(MetroFlickrViewer.FlickrUser.data.photoData);

                            MetroFlickrViewer.FlickrHandler.CurrentPage = MetroFlickrViewer.FlickrUser.data.currentPage;

                            MetroFlickrViewer.FlickrUser.userId = MetroFlickrViewer.FlickrUser.data.userId;

                        }

                    }



                    complete();

                },

                function (errorMessage) {

                    console.log(errorMessage);

                }

            );

        });

    };



    this.dataFileExists = function () {

        local.exists(this.fileName).then(

            function (result) {

                return result;

            },

            function(errorMessage){

                console.log(errorMessage);

            }

        );



        // the file was not found for some reason

        return false;

    }

}