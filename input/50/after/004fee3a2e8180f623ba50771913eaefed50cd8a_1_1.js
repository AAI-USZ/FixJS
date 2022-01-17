function(e){
            if(String.fromCharCode(e.charCode).toLocaleUpperCase() === 'N'){
                instructions.firstElementChild.innerHTML = "choose Up or down, corresponding to whether the yellow box goes in the top or bottom red boxes.";
                routineFix();
            }
        }