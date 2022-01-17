function() {
        $.ajax({
            url: "/update",
            type: "POST",
        }).success(function() {
            success("Обновление успешно выполнено");
        }).fail(function(e,b) {
            fail("Ошибка при обновлении");
        });
    }