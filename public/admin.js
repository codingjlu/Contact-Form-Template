$(".trash-can").click(function() {
  const el = this;
  if(confirm("Are you sure?")) {
    const id = $(el).attr("data-submission");
    $.ajax({
      url: "/delete",
      type: "post",
      data: {
        key: id
      },
      success: function() {
        notifications("Deleted!", "success");
        $(el).parent().parent().hide(500);
      },
      error: function(message) {
        notifications("Something happened...", "error");
      }
    });
  }
});

function convertToLocal(date) {
  var localDate = new Date(Date.parse(date)).toLocaleString();
  return localDate;
}

const allDates = document.querySelectorAll(".submissions > tbody > tr[title]");
allDates.forEach(item => {
  $(item).attr("title", convertToLocal($(item).attr("title")));
});
