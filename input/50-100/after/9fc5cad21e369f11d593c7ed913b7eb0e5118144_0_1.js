function (result) {
        console.log(result);
        if (result.isMatch) {
            self.shouldAllowCreate(false);
            self.nameIsAvailable(false);
            self.nameIsTaken(true);
            $.publish('/gym/name/taken', result.id);
        }
        else {
            self.shouldAllowCreate(true);
            self.nameIsAvailable(result.inputHasValue);
            self.nameIsTaken(false);
            $.publish('/gym/name/available');
        }
    }