// Add event listener to password input
$(".password").on('keypress',function(e) {
  // Check if key is enter
  if(e.which == 13) {
    $.ajax({
      url: "/login",
      type: "post",
      data: {
        password: $(".password").val()
      },
      success: function(message) {
        location.reload();
      },
      error: function(message) {
        notifications("Invalid password", "error");
      }
    });
  }
});
