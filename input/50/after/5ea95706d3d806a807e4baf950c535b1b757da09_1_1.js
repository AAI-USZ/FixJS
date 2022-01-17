function () {
                this.get("el").on("keyup", this.handleKeyEventInternal, this);
                this.publish("click", {
                    bubbles:1
                });
            }