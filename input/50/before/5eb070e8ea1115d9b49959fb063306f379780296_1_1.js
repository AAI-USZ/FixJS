function () {

        var model = t.createUserModel();

        t.is(model.get('displayName'), 'Jorgen Sivesind', 'Found display name');
        t.is(model.get('email'), 'jsi@enonic.com', 'Could read email');
    }