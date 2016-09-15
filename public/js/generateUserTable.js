function generateTable() {

    var table = "<table class='table table-hover'>\
                    <thead>\
                        <tr>\
                            <th>Username</th>\
                            <th>Role</th>\
                            <th>Delete</th>\
                        </tr>\
                    </thead>\
                    <tbody>"

    $.getJSON("/api/users", function(data) {
        // define the roles for later when we want to convert the number
        // representation stored in the database
        var roles = ['Standard', 'Admin', 'Dev'];

        // for each JSON object that .getJSON finds
        $.each(data, function(i, user) {

            if (user.local.role != 2) {

                // create a new row with the information for each user
                var newRow = "<tr><td>" + user.local.username + "</td>\
                                  <td>" + roles[user.local.role] + "</td>\
                                  <td>" + "<button onclick=\"(delUser('" + user._id + "'))\" class='btn btn-danger btn-sm'>\
                                           <span class='glyphicon glyphicon-trash'></span>\
                                           </button></tr>"

                // append the HTML for the new row to the table
                table += newRow;
            }
        });
        // append the closing tags to the end of the table
        table += "</tbody></table>";
        // change the HTML of the #table div to the HTML generated for the table
        $("#table").html(table);
    })

}

function delUser(id) {
    // reload page
    location.reload();
    // make a post request to /api/users with the user's id
    $.ajax({
        type: "POST",
        url: "/api/users",
        data: { id: id }
    });

}

$(document).ready(function() {

    generateTable();

});
