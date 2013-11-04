// Hides all the forms from view when the page loads
// ]]$(".forms").hide();

// CSS selector assigned to markup is used to trigger events
$(".form-toggle").click(function(){

  // grabbs the ID of `this` href
  var idToShow = $(this).attr("href");

  $(this).addClass("active").siblings('.form-toggle').removeClass('active');

  // Uses the ID to pivot off of to find siblings
  $(idToShow).show().siblings(".forms").toggle();
  return false;
});


// ID of text field is used to trigger event
$("#sign_up_confirmation").blur(function() {

  // Evaluate if the two fields contain the same content
  if( $(this).val() != $("#sign_up_password").val()) {
    $(this).addClass("fail").next().text("Passwords don't match.");
  } else {
    $(this).removeClass("fail").next().text("YEAH SUCKA!");
  }
});
