function(data) {
                eval(data);
                ts_ext_reload();
                buzzer_preselect('pct',pct,pct_name,knd,knd_name,false);
                buzzer_preselect('evt',evt,evt_name,0,0,false);
                $("#ticker_knd").html(knd_name);
                $("#ticker_pct").html(pct_name);
                $("#ticker_evt").html(evt_name);
        }