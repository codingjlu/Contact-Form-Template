/**
 * Validates and submits form via AJAX
 * jQuery required
 */

$(".submit").click(function() { // Once you click the submit button
  // Get value of inputs
  const email = $(".email").val();
  const name = $(".name").val();
  const message = $(".message").val();

  const checkResult = check(email, name, message); // Validate the form
  if(checkResult.length > 0) { // Check if there are errors
    // Make it grammatical
    if(checkResult.length === 1) { // 1 error
      notifications(capitalize(checkResult[0]), "error");
    }
    else { // Multiple errors
      // Create our grammatical error string
      if(checkResult.length === 2) { // "and" without a comma
        notifications(capitalize(checkResult[0]) + " and " + checkResult[1], "error");
      }
      else {
        let res = capitalize(checkResult[0]) + ", ";
        for (let blah = 1; blah < checkResult.length; blah++) {
          if(blah === checkResult.length - 1) { // This is the last error
            res += "and " + checkResult[blah] + ".";
          }
          else
            res += checkResult[blah] += ", ";
        }
        notifications(res, "error");
      }
    }
  }
  else {
    // Send AJAX request to submit form
    $.ajax({
      url: "/", // POST destination is home route
      type: "post", // Request type is POST
      data: { // POST the info
        email: email,
        name: name,
        message: message
      },
      success: function(message) {
        notifications("Submitted!", "success");
        $(".message").val("");
        $(".email").val("");
        $(".name").val("");
      },
      error: function(message) {
        notifications("Hey, stop tampering with my JS!", "error"); // We already validated the code on the client side. We also did that on the server side for an extra line of defense, and server side validation only would fail if the user was messing with the code
      }
    });
  }
});

// Validates form
function check(email, name, message) {
  let errors = []; // Array if errors
  if(email == "") {
    errors.push("empty email");
  }
  if(name == "") {
    errors.push("empty name");
  }
  if(message == "") {
    errors.push("empty message");
  }
  if(!validateEmail(email)) {
    if(!errors.includes("empty email")) // Don't include invalid email if the user didn't even include one
      errors.push("invalid email");
  }
  if(email.length > 60) {
    errors.push("email too long");
  }
  if(name.length > 50) {
    errors.push("name too long");
  }
  if(message.length > 3000) {
    errors.push("message too long");
  }
  return errors;
}


// Check if email is valid
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()); // String() converts a value to a string if it isn't
}

// Capitalize the first letter of the string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
