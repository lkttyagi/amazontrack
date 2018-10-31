$(document).ready(function() {
  // amazon account form stuff

  $('#amz-marketplace').multiselect();
  $('ul.multiselect-container').css('display', 'none');

  $('button.multiselect').on('click', function(evt){
    $('ul.multiselect-container').toggle();
  })
  $('#amz-cancel').on('click', function(evt){
    $('#amazonForm').modal('hide');
  })
  $( "#amazonRealForm" ).submit(function( event ) {
    event.preventDefault();
    amazonCheckConnect(event);
    console.log("done submit func");
  });
});

function amazonCheckConnect(event) {
  var data = $('form').serializeArray()
  // console.log(window.location.href);
  $.post('/profile/amazonAcc/connect', data)
  .done(function(){
    // $(cardIdentifier).hide();
    $('#amazonForm').modal('hide');
    $.notify({
      message: "Amazon account successfully added."

    },{
        type: 'success',
        timer: 4000,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
    if (window.location.href.includes("profile")) {
      // window.location.href = 'https://app.trackerbot.me/profile';
      window.location.href = 'https://app.trackerbot.me/profile';
    }
    else if (window.location.href.includes("sellers")){
      // window.location.href = 'https://app.trackerbot.me/welcome/gmail';
      window.location.href = 'https://app.trackerbot.me/welcome/gmail';

    }
    // location.reload();
  })
  .fail(function(err){
    if (err.status !== 406) {
      $('#amazonForm').modal('hide');
    } else {
      alert('One or more fields were not filled.');
      return;
    }
    if (err.status == 409) {
      var message = "Account with same Seller Id already exists in our database."
    }
    else if(err.status == 400) {
      var message = "Could not establish connection with these credentials. Please try again."
    }
    else if(err.status == 500) {
      var message = "Internal server error, please contact support."
    }
    $.notify({
      message: message

    },{
        type: 'danger',
        timer: 4000,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
  })
}
