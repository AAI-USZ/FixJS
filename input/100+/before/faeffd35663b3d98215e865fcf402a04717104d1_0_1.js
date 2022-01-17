function() {
                        var rule = $(this).data('rule');
                        $('div#emptyDialog').attr('title', PMA_messages['strRuleDetails']);
                        $('div#emptyDialog').html(
                            '<p><b>' + PMA_messages['strIssuse'] + ':</b><br />' + rule.issue + '</p>' +
                            '<p><b>' + PMA_messages['strRecommendation'] + ':</b><br />' + rule.recommendation + '</p>' +
                            '<p><b>' + PMA_messages['strJustification'] + ':</b><br />' + rule.justification + '</p>' +
                            '<p><b>' + PMA_messages['strFormula'] + ':</b><br />' + rule.formula + '</p>' +
                            '<p><b>' + PMA_messages['strTest'] + ':</b><br />' + rule.test + '</p>'
                        );
                        
                        var dlgBtns = {};
                        dlgBtns[PMA_messages['strClose']] = function() { 
                            $(this).dialog('close'); 
                        };
                        
                        $('div#emptyDialog').dialog({ width: 600, buttons: dlgBtns });
                    }