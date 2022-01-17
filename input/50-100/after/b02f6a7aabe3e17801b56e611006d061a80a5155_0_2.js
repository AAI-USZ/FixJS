function() {
        $.ajax({
            url: "/update",
            type: "GET",
        }).success(function() {
            success("Обновление успешно выполнено");
        }).fail(function(e,b) {
            fail("Ошибка при обновлении");
        });
    }