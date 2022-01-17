function() {
        self.elm.html("<div>Updating...</div>")
            .effect('highlight',{color:'#ffd'},1000);
        model.getTypes(updatePalette);
    }