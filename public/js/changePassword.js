$("#changePassword").click(function() {

    // assign the inputs to variables
    var $oldPass = $("#oldPassword");
    var $newPass = $("#newPassword");
    var $confirmNewPass = $("#confirmNewPassword");

    // make sure that the passwords match
    if ($newPass == $confirmNewPass) {

        // make sure that the password is at least 6 characters
        if ($newPass.length > 5) {

            // send a POST request to /settings
            $.ajax({
                type: "POST",
                url: "/settings",
                data: {
                    oldPass: $oldPass.val(),
                    newPass: $newPass.val()
                },
                success: function(response) {
                    // check to see what the response from the server is
                    if (response.status == 'done') {
                        // if the response is 'done', alert the user that their
                        // password changed successfully
                        alert('Password changed successfully');
                        $oldPass.val("");
                        $newPass.val("");
                        $confirmNewPass.val("");
                    } else if (response.status == 'err') {
                        // if the response is 'err', alert the user that it didn't work
                        alert('Something went wrong trying to change the password.\
                                try again later.');
                    }
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
