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
        }+new+york+city`
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

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh no! Something went wrong!'))
  console.error(err)
  db.close()
})
