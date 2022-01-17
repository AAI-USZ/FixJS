function login_win() {
    $("#dlg_inner2").html('<form onsubmit="return login_login();"><p>Имя: <input id="login_name" class="blueinput"></p><p>Пароль: <input id="login_pass" type="password" class="blueinput"></p><input type="submit"  class="styledbutton" value="[&lt; Войти &gt;]"><span id="login_progress"></span><input type="button" onclick="return login_cancel();" class="styledbutton" value="[&lt; Отмена &gt;]"></form>');
    var inner = $("#dlg_inner");
    inner.css("left", ($(window).width() - inner.width()) / 2);
    inner.css("top", ($(window).height() - inner.height()) / 2);
    inner.show()
}