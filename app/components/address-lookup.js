import Ember from 'ember';

export default Ember.Component.extend({
  location: {
    ems: {
      nearestTraumaAdult: {
        addr: "1901 W Harrison St",
        city: "Chicago",
        distance: 6374.970223608582,
        distanceMi: 3.96,
        latitude: 41.873588,
        level1Adult: true,
        level1Ped: true,
        longitude: -87.674275,
        medChannel: "155.340MHz, 463.025MHz, 463.150MHz",
        name: "John H. Stroger, Jr. Hospital of Cook Co.",
        state: "IL",
        zip: 60612
      },
      nearestTraumaPed: {
        addr: "5841 S Maryland Ave",
        city: "Chicago",
        distance: 4946.838951442905,
        distanceMi: 3.07,
        latitude: 41.788313,
        level1Adult: false,
        level1Ped: true,
        longitude: -87.604566,
        medChannel: "463.125MHz, 463.150MHz",
        name: "University of Chicago Medical Center",
        state: "IL",
        zip: 60637,
      }
    },
    fire: {
      battalion: "2",
      channel: "Englewood",
      emsDistrict: "7",
      fireDistrict: "1",
      nearestAmbo: "A4",
      nearestEngine: "E19"
    },
    meta: {
      alderman: {
        name: "Pat Dowell",
        ward: 3,
        website: "http://www.cityofchicago.org/city/en/about/wards/03.html"
      },
      communityArea: "Douglas",
      formattedAddress: "3510 S Michigan Ave, Chicago, IL 60653, USA",
      latitude: "41.830365",
      longitude: "-87.623840",
      neighborhood: "Douglas",
      ward: "3"
    },
    police: {
      area: "Central",
      beat: "0213",
      district: "2nd",
      zone: {
        freq: "460.500MHz",
        mp3: "http://relay.broadcastify.com/khtxwn0r1v53.mp3",
        num: "5",
        url: "http://www.broadcastify.com/listen/feed/23006"
      }
    },
    stats: {}
  }
});