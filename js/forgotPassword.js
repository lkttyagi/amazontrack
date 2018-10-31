function openForgotPasswordModal(){
    showForgotPassword();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}

function showForgotPassword(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        // $('#labelSpan').html('Login');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        // $('.modal-title').html('Login');
    });
     $('.error').removeClass('alert alert-danger').html('');
}

function resetPasswordAjax() {
  var email = $("#emailForgotPW").val();
  var d = {
    email: email
  }
  $.post( "/forgotPassword", d, function( data ) {
    if(data.pwReset){
      window.location.replace("/successReset");
    }
    else {
      shakeModal(data.msg);
    }
  });
}

function shakeModal(msg){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html(msg);
            //  $('input[type="password"]').val('');
             setTimeout( function(){
                $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );
}

openForgotPasswordModal();
$('#loginModal').modal('show').on('hide.bs.modal', function (e) {
  e.preventDefault();
})
