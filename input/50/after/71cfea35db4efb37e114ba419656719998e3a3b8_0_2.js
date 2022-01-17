function ($result) {
            var scroll = $result.position().top + $('#result').scrollTop();
            $('#result').animate({scrollTop: scroll});
        }