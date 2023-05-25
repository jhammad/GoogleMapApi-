let map;
let markers = [];

function initMap() {
  const glasgow = { lat: 55.83582604734759, lng: -4.2541586022131215 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: glasgow,
  });
  map.addListener("click", (event) => {
    addMarker(event.latLng);
  });
}

function addMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
        url: "images/red_dot.png",        
        scaledSize: new google.maps.Size(35, 35),
        filter: "hue-rotate(0deg)",
        className: "dot",
      },
  });
  markers.push(marker);
  console.log(markers);

  if (markers.length >= 2) {
    const lastMarker = markers[markers.length - 2];
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      lastMarker.getPosition(),
      marker.getPosition()
    );
    const content = `Distance: ${distance.toFixed(2)} meters`;
    const infoWindow = new google.maps.InfoWindow({
      content: content,
    });
    infoWindow.open(map, marker);


    // Close the infoWindow after 5 seconds
    setTimeout(function() {
    infoWindow.close();
  }, 5000);
    console.log(content);
    console.log(marker)
  }
}