People = new Meteor.Collection('people');
// {name: 'me', date: 'somedate' lat: '0.1345', lon: '51.735'}


// all this should probably go under the client bit
// but i was having trouble with execution order and this was a quick workaround
// hey-ho
if (Meteor.is_client) {

	map_people();
	//don't know why but this next line solves a weird thing where markers don't show up. mmmm.
	People.remove();

	setTimeout(function () {
		google.maps.event.addListener(peopleMap, 'rightclick', function(event) {
			var username = prompt("Enter yr name to add yrself to the map")
			if (!(username == null)) {
				People.insert({name: username, date: new Date().toUTCString(), lat: event.latLng.Ya, lon: event.latLng.Za})
			}
		});
	}, 1000);
};