var fs = require('fs');
fs.readFile('data.txt', function(err, data) {
  if (err) {
    console.log('error:', err);
  }
  var text = data.toString().split("\n");
  var events = [];
  var date = new Date();
  date.setYear(2015);

  text.forEach(function(line) {
    if (line.startsWith("April")) { date.setMonth(3); return; }
    else if (line.startsWith("May")) { date.setMonth(4); return; }
    else if (line.startsWith("June")) { date.setMonth(5); return; }
    else if (line.startsWith("July")) { date.setMonth(6); return; }
    else if (line.startsWith("August")) { date.setMonth(7); return; }

    line = line.trim();
    if (line === '') { return; }

    var day = parseInt(line.split(" ")[1]);
    date.setDate(day);

    var artists = line.split("-")[1].split("@")[0] || "";
    var venue = line.split("-")[1].split("@")[1] || "";
    var city = line.split("-")[2] || "";

    (function(d) {
      events.push({
        date: d,
        artists: artists.trim(),
        venue: venue.trim(),
        city: city.trim()
      });
    })(date);
  });

  fs.writeFile('data.json', JSON.stringify(events, null, 2), function(err) {
    if (!err) {
      console.log("'data.json' written");
    }
  });
});
