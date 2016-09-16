$("changePassword").click(function() {

    // assign the inputs to variables
    var $oldPass = $("#oldPassword").val();
    var $newPass = $("#newPassword").val();
    var $confirmNewPass = $("#confirmNewPassword").val();

    // make sure that the passwords match
    if ($newPass == $confirmNewPass) {

        // make sure that the password is at least 6 characters
        if ($newPass.length > 5) {

            // send a POST request to /settings
            $.ajax({
                type: "POST",
                url: "/settings",
                data: {
                    oldPass: $oldPass,
                    newPass: $newPass
                }
            });

        } else {

            // alert the user to lengthen the password
            alert("Please make sure that your new password is at least 6 characters!");

        }

    } else {

        // alert the user if the passwords don't match
        alert("New password and confirm new password fields must match!");

    }

});
