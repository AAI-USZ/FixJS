function (jPanel) {
            var jPanel = jPanel || $('#panel'),
                content = jPanel.find('.panel-content'),
                position;
            if (jPanel.hasClass("opened")) {
                KT.panel.copy.hide_form();
                $('.block.active').removeClass('active');
                jPanel.animate({
                    left: 0,
                    opacity: 0
                }, 400, function () {
                    $(this).css({
                        "z-index": "-1"
                    });
                }).removeClass('opened').addClass('closed').attr("data-id", "");
                content.html('');
                position = KT.common.scrollTop();
                $.bbq.removeState("panel");
                $.bbq.removeState("panelpage");
                $(window).scrollTop(position);
                updateResult();
                contract_cb(name);
                closeSubPanel(subpanel);
            }
            return false;
        }