$(document).ready(function () {

  var form = '#contactForm';

  $( form ).on( 'submit', function(e) {
    e.preventDefault();
    $('input#submit').attr('value', 'Processing..');
    var name = $("input#name").val();
    var email = $("input#email").val();
    var company = $("input#company").val();
    var phone = $("input#phone").val();
    var message = $("textarea#message").val();
    var route = "process.php";

    /*messages for guests*/
    var target = '#alert';
    var errMsg= 'Error! Could not contact server';
    var sucMsg= "Thanks! Your message has been received. Someone will get back to you.";
    var nameError = "Name is required";
    var emailError = "Email is required";
    var companyError = "Company is required";
    var phoneError = "Phone is required";
    var messageError = "Message is required";
    var messageShortError = "Message is too short";

    function validate(nm,em,msg,com,phn) {
      $(target).removeClass('alert-success')

      if(nm==""){
          $("input#name").parent('div').addClass('has-error');
          $(target).removeClass('hidden').addClass('alert-danger');
          $(target).text( nameError );
          $("input#name").focus();
          resetSubmit();
          return false;
      }
      $("input#name").parent('div').removeClass('has-error');

      if(em==""){
          $("input#email").parent('div').addClass('has-error');
          $(target).removeClass('hidden').addClass('alert-danger');
          $(target).text( emailError );
          $("input#email").focus();
          resetSubmit();
          return false;
      }
      $("input#email").parent('div').removeClass('has-error');

      // if(com==""){
      //     $("input#company").parent('div').addClass('has-error');
      //     $(target).removeClass('hidden').addClass('alert-danger');
      //     $(target).text( companyError );
      //     $("input#company").focus();
      //     resetSubmit();
      //     return false;
      // }
      // $("input#company").parent('div').removeClass('has-error');
      // if(phn==""){
      //     $("input#phone").parent('div').addClass('has-error');
      //     $(target).removeClass('hidden').addClass('alert-danger');
      //     $(target).text( phoneError );
      //     $("input#phone").focus();
      //     resetSubmit();
      //     return false;
      // }
      // $("input#phn").parent('div').removeClass('has-error');
      if(msg==""){
          $("textarea#message").parent('div').addClass('has-error');
          $(target).removeClass('hidden').addClass('alert-danger');
          $(target).text( messageError );
          $("textarea#message").focus();
         resetSubmit();
         return false;
       //check message length
      } else if(msg.length<10){
          $(target).removeClass('hidden').addClass('alert-danger');
          $(target).text( messageShortError );
          $("textarea#message").focus();
          resetSubmit();
          return false;
      }
      $("#message").parent('div').removeClass('has-error');
      /*if all is good*/
      $(target).removeClass('alert-danger').addClass('hidden');
      $(target).text('');
      return true;
    }

    function resetSubmit(){
      $('input#submit').attr('value', 'SEND MESSAGE');
    }

    if( validate(name,email,message,company, phone )==true){
      /*process the form*/
      var jqxhr = $.ajax({
            type: "POST",
            dataType: 'json',
            url: route,
            // data: {"name":name,"email":email,"message":message,"id":id,"_token":token },
            // data: JSON.stringify({
            //     "name": name,
            //     "email": email,
            //     "company": company,
            //     "phone": phone
            // }),
            // data: {"name":name,"email":email,"message":message },  
            data: { 
                "name": name,
                "email": email,
                "company": company,
                "phone": phone,
                "message": message,
            },
            success: function(data, textStatus, jqXHR){
              if(jqXHR.responseJSON.status){
                  // alert(textStatus);
                  if(data.mailSent){
                    /*reset the form*/
                    $(form)[0].reset();
                    /*reset button*/
                    resetSubmit();

                    /*show success message*/
                    $(target).removeClass('hidden').removeClass('alert-danger').addClass('alert-success');
                    $(target).text( sucMsg );
                  } else {
                    // $(target).removeClass('hidden').removeClass('alert-success').addClass('alert-danger');
                    // $(target).text( sucMsg );
                  }
              } else {
                  alert(jqXHR.responseJSON.message);
              }
            },
            error: function(jqXHR, textStatus, errorThrown){
              resetSubmit();
              /*alert( textStatus + " " + errorThrown );*/
              $(target).removeClass('hidden').removeClass('alert-success').addClass('alert-danger');
              $(target).text( errMsg );
            }
        });
      // function showResponse(data, textStatus, jqXHR) {
      //     console.log(jqXHR);
      // }
      // function showError(jqXHR, textStatus, errorThrown) {
      //     alert('Something went wrong.Please Try again later...');
      // }
       // event.preventDefault();
  }
 });
});