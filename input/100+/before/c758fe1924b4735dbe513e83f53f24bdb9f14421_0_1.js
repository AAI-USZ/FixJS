function () {
            var $this = $(this);
            var validator = $this.mtValidator();
            if ( !validator ) return true;
            var $current_error = $.data( this, 'mtValidateError' );
            var rules = $.data( this, 'mtValidateRules' );
            var res = validator.validateElement($this, rules);
            if ( res ) {
                successes++;
                if ( $current_error ) {
                    validator.removeError( $this, $current_error );
                }
                $.data( this, 'mtValidateError', null );
                $.data( this, 'mtValidateLastError', null );
                $this.addClass( validator.validClass );
                $this.removeClass( validator.errorClass );
            }
            else {
                errors++;
                if ( validator.doFocus )
                    error_elements.push($this);
                var msg = validator.errstr;
                if ( $current_error ) {
                    var last_error = $.data( this, 'mtValidateLastError' );
                    if ( last_error != msg ) {
                        validator.updateError( $this, $current_error, msg );
                    }
                }
                else {
                    var $error_block = validator.wrapError( $this, msg );
                    validator.showError( $this, $error_block );
                    $.data( this, 'mtValidateError', $error_block );
                    $.data( this, 'mtValidateLastError', msg );
                }
                $.data( this, 'mtValidateLastError', msg );
                $this.addClass( validator.errorClass );
                $this.removeClass( validator.validClass );
            }
        }