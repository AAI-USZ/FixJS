function() {

    $('#intro-header').fadeOut(200);
    $('#intro-body').fadeOut(200);

    $('#new-wallet').fadeIn(200);
    $('#password-strength').fadeIn(200);

    $("#new-wallet-continue").click(function() {

        $(this).attr("disabled", true);

        try {
            generateNewWallet();

            $(this).attr("disabled", false);
        } catch (e) {
            makeNotice('error', 'misc-error', e, 5000);

            $(this).attr("disabled", false);
        }
    });


    //Password strength meter
    $('#password').bind('change keypress keyup', function() {

        var warnings = document.getElementById('password-warnings');
        var result = document.getElementById('password-result');
        var password = $(this).val();

        var cps = HSIMP.convertToNumber('250000000'),
            time, i, checks;

        warnings.innerHTML = '';
        if(password) {
            time = HSIMP.time(password, cps.numeric);
            time = HSIMP.timeInPeriods(time);

            $('#password-result').fadeIn(200);

            if (time.period === 'seconds') {
                if (time.time < 0.000001) {
                    result.innerHTML = 'Your password would be hacked <span>Instantly</span>';
                } else if (time.time < 1) {
                    result.innerHTML = 'It would take a desktop PC <span>' + time.time+' '+time.period+ '</span> to hack your password';
                } else {
                    result.innerHTML = 'It would take a desktop PC <span>About ' + time.time+' '+time.period+ '</span> to hack your password';
                }
            } else {

                result.innerHTML = 'It would take a desktop PC <span>About ' + time.time+' '+time.period+ '</span> to hack your password';
            }

            checks = HSIMP.check(password);
            HSIMP.formatChecks(checks.results, warnings);

            if (checks.insecure) {
                result.innerHTML = '';
                $('#password-result').fadeOut(200);
            }

        } else {
            result.innerHTML = '';
            $('#password-result').fadeOut(200);
        }
    });

    $('#wallet-login-continue').click(function() {
        $(this).attr("disabled", true);

        var email = $('#new-wallet-email').val();
        var alias = $('#new-wallet-alias').val();

        loadScript(resource + 'wallet/account.min.js', function() {
            if (email.length > 0 && alias.length > 0) {
                updateKV('Updating Alias', 'update-alias', alias, function() {
                    updateKV('Updating Email', 'update-email', email, function() {
                        window.location = root + 'wallet/' + guid + window.location.hash;
                    }, function() {
                        $(this).attr("disabled", false);
                    });
                });
            } else if (email.length > 0) {
                updateKV('Updating Email', 'update-email', email, function() {
                    window.location = root + 'wallet/' + guid + window.location.hash;
                }, function() {
                    $(this).attr("disabled", false);
                });
            } else if (alias.length > 0) {
                updateKV('Updating Alias', 'update-alias', alias, function() {
                    window.location = root + 'wallet/' + guid + window.location.hash;
                }, function() {
                    $(this).attr("disabled", false);
                });
            } else {
                window.location = root + 'wallet/' + guid + window.location.hash;
            }
        });
    });

    changeView($("#new-wallet"));
}