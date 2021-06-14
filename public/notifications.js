// Paired alongside notifications.css. To make notifications, call notifications("Your notification", "success" || "error"). Status is optional. Defaults to plain

function notifications(text, status) {
  if(status) {
    status = "notif-" + status;
  }
  if ($( ".notif" ).length) {
    $( ".notif" ).remove();
  }
  $("body").append(`<div class="notif ${status || ""}">${ text }&nbsp;<span>&times;</span></div>`);
  $('.notif').fadeIn();
  $('.notif > span').click(function() {
    $('.notif').fadeOut();
  });
  setTimeout(function() {
    $('.notif').fadeOut();
  }, 3000);
}
