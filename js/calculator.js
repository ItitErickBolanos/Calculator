function Calculator(){
    var prevOperator = false,
        prevDecimal = false;

    this.$display = $("#displayOperation");
}

Calculator.prototype = {

    concatOperation: function($buttonClicked){
        if ((this.prevOperator || this.prevDecimal) && ($buttonClicked.hasClass("operator") || $buttonClicked.hasClass("decimal"))){
            this.$display.val(this.$display.val().slice(0, this.$display.val().length - 1) + $buttonClicked.val());
        } else {
            if($buttonClicked.hasClass("decimal")){
                var splitNumbers = this.$display.val().split(/[+\/*-]/);
                if(splitNumbers[splitNumbers.length - 1].indexOf(".") == -1) {
                    this.$display.val(this.$display.val() + $buttonClicked.val());
                }
            } else {
                this.$display.val(this.$display.val() + $buttonClicked.val());
                this.prevOperator = $buttonClicked.hasClass("operator");
                this.prevDecimal = $buttonClicked.hasClass("decimal");
            }
        }
    },

    evaluate: function(){
        this.$display.val(eval(this.$display.val()));
    },

    clear: function(){
        this.prevOperator = this.prevDecimal = false;
        this.$display.val("");
    },

    deleteOperation: function(){

    }
}

$(document).ready(function(){

    var calc = new Calculator();

    $(".button").click(function(){
        if ($(this).val() != "=" && $(this).val() != "AC" && $(this).val() != "CE"){
            calc.concatOperation($(this));
        } else {
            switch($(this).val()){
                case "=":
                    calc.evaluate($("#displayOperation").val());
                break;

                case "AC":
                    calc.clear();
                break;

                case "CE":
                    calc.deleteOperation();
                break;
            }
        }
    });
});
