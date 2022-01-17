function (Backbone,
             core,
             sandbox,
             srpsession,
             passwords,
             notes,
             applications) {

    console.log('Starting app');
    core.start(applications);
    core.start(srpsession, './authentication');

    core.broadcast('bootstrap');

    core.subscribe('login', function () {
        core.start(passwords);
        core.start(notes);
    });

    //~ core.subscribe('logout', function () {
        //~ core.stop(passwords);
        //~ core.stop(notes);
        //~ core.stop(applications);
    //~ });

    //~ core.broadcast('request:login','nicolas','test');
}