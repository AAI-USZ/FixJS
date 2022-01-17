function publishStory() {
    //Create a FB Feed Dialog & capture the response
    FB.ui({
        method: 'feed',
        name: 'I\'m building a social mobile web app!',
        caption: 'This web app is going to be awesome.',
        description: 'Check out Facebook\'s developer site to start building.',
        link: 'http://icebreaker.fbdublin.com/index.html',
        picture: 'http://www.colmisainmdom.com/img/headshot.jpg'
    },
    function(response) {
        console.log('publishStory response: ', response);
    });
    return false;
}