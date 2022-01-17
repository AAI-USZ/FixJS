function() {
        $.ajax({
            url: "/update",
            type: "POST",
        }).success(function() {
            window.reload();
        }).fail(function(e,b) {
            alert('Error: ' + e.status);
        });
    }