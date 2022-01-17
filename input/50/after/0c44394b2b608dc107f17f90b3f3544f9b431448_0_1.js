function (userName) {

        MetroFlickrViewer.FlickrUser.userName = userName;



        // start at the first page

        this.CurrentPage = 1;



        // init the photos

        this.PhotoHash = {};



        this.cancelRequests();



        this.CurrentStatus = 'none';



        // when the user name is gotten get the associated id

        this.getUserId();

    }