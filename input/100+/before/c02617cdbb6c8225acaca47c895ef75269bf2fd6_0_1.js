function startGame() {
        clean_game();

        hits = 0;
        var k = 0;

        for (i = 0; i < niz_mid.length; i++) {
            if (niz_mid[i] != "") { niz_br[k] = (niz_mid[i][1] + niz_mid[i][2]); niz_br[k] = parseInt(niz_br[k]); k++; }
        }

        if (k > 2 && bet != 0 && bet <= credit) {
            runda++;
            pokreni(); // pokretanje leve tabele
            popuni_desno_tab(); // pokretanje desne tabele
            $.ajax(
        {
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "http://edit12.comtrade.com/KenoService/KenoService.svc/Igra?id=" + korisnik.ID + "&e=" + korisnik.mail + "&u=" + bet + "&o=" + niz_br,
            data: "",
            dataType: "jsonp",
            success: function (data) {
                Dolazak = data.OdigrajIgruResult;
                proveriDobitke();
            },
            error: function () {
                console.log("Communication Error!");
            }
        });
        }
        else {
            blokiranje_button = false;
            $(kankan).css("visibility", "hidden");
        }
    }