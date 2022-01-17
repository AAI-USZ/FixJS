function Contact(service) {
    var _self = {
        anniversary: null,
        birthday: null,
        categories: [],
        company: null,
        email1: "",
        email2: "",
        email3: "",
        faxPhone: null,
        firstName: null,
        homeAddress: null,
        homePhone: null,
        homePhone2: null,
        jobTitle: null,
        lastName: null,
        mobilePhone: null,
        note: null,
        otherPhone: null,
        pagerPhone: null,
        picture: null,
        pin: null,
        title: null,
        uid: null,
        user1: null,
        user2: null,
        user3: null,
        user4: null,
        webpage: null,
        workAddress: null,
        workPhone: null,
        workPhone2: null,
        remove: function () {
            if (!_self.uid) {
                throw "task has not yet been saved (has no uid)";
            }
            transport.call(_uri + "remove", {
                get: { id: _self.uid }
            });
        },
        save: function () {
            if (!_self.uid) {
                _self.uid = Math.uuid(null, 16);
            }
            transport.call(_uri + "save", {
                post: { contact: _self }
            });
        },
        setPicture: function (picture) {
            throw "not implemented";
        }
    };

    return _self;
}