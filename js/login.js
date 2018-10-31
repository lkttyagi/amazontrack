$('#emailLogin').keyup(function(event) {
  if (event.keyCode === 13) {
    $('#loginBtn').click();
  }
})

$('#passwordLogin').keyup(function(event) {
  if (event.keyCode === 13) {
    $('#loginBtn').click();
  }
})

function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('#labelSpan').html('Register');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register');
    });
    $('.error').removeClass('alert alert-danger').html('');

}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('#labelSpan').html('Login');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Login');
    });
     $('.error').removeClass('alert alert-danger').html('');
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}

function loginAjax(){
  var email = $("#emailLogin").val();
  var password = $("#passwordLogin").val();
  if (password.length < 5 ) {
    shakeModal('Password must be at least 5 characters long');
  } else {
    var d = {
      email: email,
      password: password
    }
    $.post( "/login", d, function( data ) {
      if(data.logged_in){
        window.location.replace("/home");
      }
      else {
        shakeModal('Invalid email/password combination');
      }
    });
  }
}

function registerAjax(){
  var email = $("#emailReg").val();
  var password = $("#passwordReg").val();
  var passwordConf = $("#password_confirmationReg").val();
  var ref = getRef();
  if (password.length < 5 ) {
    shakeModal('Password must be at least 5 characters long');
    return;
  }
  if (password != passwordConf ) {
    shakeModal('Please repeat password correctly');
    return;
  }
  var d = {
    email: email,
    password: password
  }
  console.log(ref);
  if (ref != null) {
    console.log("NOT NULL");
    d.ref = ref;
  }
  $.post( "/register", d, function( data ) {
    if(data.logged_in){
      window.location.replace("/home");
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
function greenNotification(msg){
  $('.error').removeClass('alert alert-danger')
  $('.error').addClass('alert alert-success').html(msg);
}

openLoginModal();
$('#loginModal').modal('show').on('hide.bs.modal', function (e) {
  e.preventDefault();
})

function getRef(){
  var out = null;
  var a = window.location.search;
  if(a.length > 0 && a.charAt(0) == '?'){
    var tuple = a.split('=');
    if (tuple.length > 1) {
        out = parseInt(tuple[1]);
    }
  }
  if (isNaN(out)) {
    out = null;
  }
  return out;
}
