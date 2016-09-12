function generateTable() {
    var table = "<table class='table table-hover'>\
                    <thead>\
                        <tr>\
                            <th>Name</th>\
                            <th>Day</th>\
                            <th>Time Slot</th>\
                            <th>Hosts</th>\
                            <th>Delete</th>\
                        </tr>\
                    </thead>\
                    <tbody>"

    $.getJSON("/api/shows", function(data) {
        // define the weekdays for later when we have to convert the number
        // representation of days from the database
        var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        // for each json object that the getJSON method found
        $.each(data, function(i, show) {
            var hosts = [];
            // make sure that the hosts don't include empty strings
            for (s = 0; s < show.hosts.length; s++) {
                if (show.hosts[s] != "") {
                        hosts.push(" " + show.hosts[s]);
                };
            };
            // create a new row with the information for the show
            var newRow = "<tr><td>" + show.name + "</td>\
                          <td>" + weekdays[show.date.day-2] + "</td>\
                          <td>" + show.date.start + ":00" + " - " + show.date.stop + ":00</td>\
                          <td>" + hosts + "</td>\
                          <td>" + "<button onclick=\"(delShow('" + show._id + "'))\" class='btn btn-danger btn-sm'>\
                                   <span class='glyphicon glyphicon-trash'></span>\
                                   </button></tr>"
            // append the HTML for the new row to the table
            table += newRow;
        });
        // append the closing tags to the table HTML
        table += "</tbody></table>";
        // change the HTML of the #table div to the HTML generated for the table
        $("#table").html(table);
    });
}

// function to delete show
function delShow(id) {
    // reload page
    location.reload();
    // make a post request to /api/delShow with the show ID
    $.ajax({
        type: "POST",
        url: "/api/delShow",
        data: { id: id }
    });
};

$(document).ready(function() {

    // run the generate table function
    generateTable();

});
