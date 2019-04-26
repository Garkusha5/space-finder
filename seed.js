const { db, Spaces } = require('./server/db')
const { green, red } = require('chalk')
const { data, addressArray } = require('./data.js')
const fetch = require('node-fetch')
//

// )

const seed = async () => {
  await db.sync({ force: true })

  for (let i = 0; i < data.length; i++) {
    try {
      let response = await fetch(
        `http://open.mapquestapi.com/geocoding/v1/address?key=BGCVggKXKVscIKMloZtIWNJ3iufKg02c&location=${
          addressArray[i]
        }+new+york`
      )

      let myJson = await response.json()

      let { lat, lng } = myJson.results[0].locations[0].latLng

      await Spaces.create({
        address: addressArray[i],
        buildingName: data[i]['Building Name'],
        buildingLocation: data[i]['Building Location'],
        latitude: lat,
        longitude: lng,
        state: 'New York',
        type1: data[i]['Public Space 1'],
        type2: data[i]['Public Space 2'],
        type3: data[i]['Public Space 3'],
        type4: data[i]['Public Space 4'],
        type5: data[i]['Public Space 5']
      })
    } catch (error) {
      console.error(error)
    }
  }

  // const stuff = fetch(
  //   `http://open.mapquestapi.com/geocoding/v1/address?key=BGCVggKXKVscIKMloZtIWNJ3iufKg02c&location=${a}+new+york`
  // )
  //   .then(function(response) {
  //     return response.json()
  //   })
  //   .then(json => json.results[0].locations)
  //   .then(locations => {
  //     if ()
  //   })

  // for (let i = 0; i < data.length; i++) {
  //
  //   let latitude, longitude

  //   for (let i = 0; i < mapInfo.length; i++) {
  //     latitude = latitude
  //     longitude = longitude
  //     if (mapInfo[i]['adminArea5'] === 'New York City') {
  //       latitude = mapInfo[i]['latLng'].lat
  //       longitude = mapInfo[i]['latLng'].lng
  //     }
  //   }

  // try {
  //   await Spaces.create({
  //     address: space['Building Address'],
  //     buildingName: space['Building Name'],
  //     buildingLocation: space['Building Location'],
  //     // latitude: latitude,
  //     // longitude: longitude,
  //     state: 'New York',
  //     type1: space['Public Space 1'],
  //     type2: space['Public Space 2'],
  //     type3: space['Public Space 3'],
  //     type4: space['Public Space 4'],
  //     type5: space['Public Space 5']
  //   })
  // } catch (error) {
  //   error.message
  // }

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh no! Something went wrong!'))
  console.error(err)
  db.close()
})
