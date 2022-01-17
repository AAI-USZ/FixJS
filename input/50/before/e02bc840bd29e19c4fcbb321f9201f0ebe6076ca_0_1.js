function(obj) {
                        var state = "未通过";
                        className = "red";
                        if ( 1 == obj.aData.contAudit_Result ) {
                            state = "已通过";
                            className = "green";
                        }
                        return "<span class='" + className + " unl J_Audit'>" + state + "</span>";                       
                    }