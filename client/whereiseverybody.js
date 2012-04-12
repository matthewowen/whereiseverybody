var peopleMap;

function map_init() {

	var myOptions = {
		center: new google.maps.LatLng('51.508101', '-0.127952'),
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	peopleMap = new google.maps.Map(document.getElementById("map-canvas"),
	    myOptions);
	
};

function map_people() {
	dudes = People.find();

	watch = dudes.observe({
		added: function (dude) {
			var newPerson = new google.maps.Marker({
				position: new google.maps.LatLng(dude.lat, dude.lon),
				map: peopleMap,
				title: dude.name,
				when: dude.date
			})

			var contentString = dude.name + ' at ' + dude.date;

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			google.maps.event.addListener(newPerson, 'click', function() {
				infowindow.open(peopleMap, newPerson)
			});
		}
	});
};

Meteor.startup(function () {
	//initialise the map
	map_init();
});