var form = document.querySelector('.validateForm');
var submitBut = form.querySelector('.submitButton');
var xVal = form.querySelectorAll('.x');
var yVal = form.querySelector('.y');
var rVal = form.querySelectorAll('.r');
function validateCheckbox(checkboxes){
    var counter = 0;
    for(i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked) counter++; 
    }
    if(counter != 1){
        if(counter == 0){
            var error = generateError('field is blank');
            $(checkboxes[0].parentElement).append("<em></em>");
            $(checkboxes[0].parentElement).find("em").animate({opacity: "show", top: "-75"}, "slow");
            var hoverText = $(checkboxes[0].parentElement).attr("title");
            $(checkboxes[0].parentElement).find("em").text(hoverText);
        }
        else var error = generateError('оnly one value is allowed');
        checkboxes[0].parentElement.insertBefore(error,checkboxes[0]);
        return false;
    }
    else return true;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function removeTips() {
    var tips = form.querySelectorAll('.tip')      
    for (var i = 0; i < tips.length; i++) {
        tips[i].remove()
    }
  }

function validateInput(num, min, max){
    if(num.value){
        num.value = num.value.replace(',','.');
        if(isNumeric(num.value) && num.value >= min && num.value <= max){
            return true;
        }
        else{
            var error = generateError('wrong number format');
            num.parentElement.insertBefore(error,num);
            return false;
        }
    }
    else{
        var error = generateError('field is blank');
        num.parentElement.insertBefore(error,num);
        return false;
    }
}
function generateError(text){
    var tip = document.createElement('div');
    tip.className = 'tip';
    tip.style.color = 'red';
    tip.innerHTML = text;
    return tip;
}
function validateRadio(radios){
    for(i = 0 ; i < radios.length; i++){
        if(radios[i].checked) return true;
    }
    var error = generateError('field is blank');
    radios[0].parentElement.insertBefore(error, radios[0]);
    return false;

}
function validateFields(){
    return validateCheckbox(xVal) && validateInput(yVal,-5,5) && validateRadio(rVal);
}
$(document).ready(function(){
    $.ajax({
        url: 'php/load.php',
        method: "POST",
        dataType: "html",
        success: function(data){
          console.log(data);
          $("#answersTable > tbody").html(data);
        },
        error: function(error){
          console.log(error);	
        },
    })
    $(".container a").append("<em></em>");
    $(".container a").hover(function() {
        $(this).find("em").animate({opacity: "show", top: "75"}, "slow");
        var hoverText = $(this).attr("title");
        $(this).find("em").text(hoverText);
    }, function() {
        $(this).find("em").animate({opacity: "hide", top: "-85"}, "fast");
    });
})

$("#form").on('submit', function(event) {
    event.preventDefault();
    console.log("xVal: ", xVal);
    console.log("yVal: ", yVal.value);
    console.log("rVal: ", rVal);
    removeTips();
    if (!validateFields()){
        console.log("post canceled")
        return
    }
    console.log("data sending...");
    $.ajax({
        url: 'php/server.php',
        method: "POST",
        data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
        dataType: "html",
  
        success: function(data){
          console.log(data);
          $(".submitButton").attr("disabled", false);	
          $("#answersTable > tbody").html(data);
        },
        error: function(error){
          console.log(error);
          $(".submitButton").attr("disabled", false);	
        },
    })
});

$(".resetButton").on('click', function(){
    $.ajax({
        url: 'php/reset.php',
        method: "POST",
        dataType: "html",
        success: function(data){
          console.log(data);
          $("#answersTable > tbody").html(data);
        },
        error: function(error){
          console.log(error);	
        },
    })
})
