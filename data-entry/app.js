var fs = require('fs');
fs.readFile('data.txt', function(err, data) {
  if (err) {
    console.log('error:', err);
  }
  var text = data.toString().split("\n");
  var events = [];
  var month = 0;
  text.forEach(function(line) {
    if (line.startsWith("April")) { month = 3; return; }
    else if (line.startsWith("May")) { month = 4; return; }
    else if (line.startsWith("June")) { month = 5; return; }
    else if (line.startsWith("July")) { month = 6; return; }
    else if (line.startsWith("August")) { month = 7; return; }

    line = line.trim();
    if (line === '') { return; }

    var date = new Date();
    date.setYear(2015);
    date.setMonth(month);

    var day = parseInt(line.split(" ")[1]);
    date.setDate(day);

    var artists = line.split("-")[1].split("@")[0] || "";
    var venue = line.split("-")[1].split("@")[1] || "";
    var city = line.split("-")[2] || "";

    events.push({
      date: date,
      artists: artists.trim(),
      venue: venue.trim(),
      city: city.trim()
    });
  });

  fs.writeFile('data.json', JSON.stringify({events: events}, null, 2), function(err) {
    if (!err) {
      console.log("'data.json' written");
    }
  });
});
