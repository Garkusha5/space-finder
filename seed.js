const { db, Spaces } = require('./server/db')
const { green, red } = require('chalk')
const { data, addressArray } = require('./data.js')
const fetch = require('node-fetch')

const seed = async () => {
  await db.sync({ force: true })

  for (let i = 0; i < data.length; i++) {
    let space = data[i]
    // let mapInfo = addressArray.map(a =>
    //   fetch(
    //     `http://open.mapquestapi.com/geocoding/v1/address?key=BGCVggKXKVscIKMloZtIWNJ3iufKg02c&location=${a}`
    //   ).then(response => console.log(response))
    // )
    // for (let i = 0; i < mapInfo.length; i++) {
    //   if (mapInfo[i]['adminArea5'] === 'New York City') {
    //     let latitude = mapInfo[i]['latLng'].lat
    //     let longitude = mapInfo[i]['latLng'].lng
    //   }
    // }

    try {
      await Spaces.create({
        address: space['Building Address'],
        buildingName: space['Building Name'],
        buildingLocation: space['Building Location'],
        // latitude: latitude,
        // longitude: longitude,
        state: 'New York',
        type1: space['Public Space 1'],
        type2: space['Public Space 2'],
        type3: space['Public Space 3'],
        type4: space['Public Space 4'],
        type5: space['Public Space 5']
      })
    } catch (error) {
      error.message
    }
  }

  // const NYU = await Spaces.create({
  //   name: 'NYU',
  //   imgUrl:
  //     'https://yt3.ggpht.com/-RZYi5isxH_M/AAAAAAAAAAI/AAAAAAAAAAA/rmWpoe2qZzI/s900-c-k-no/photo.jpg',
  //   address: 'washington square park',
  //   description:
  //     'This school is for the person who wants to live in NYC forever. You will have the whole city as your campus.'
  // })

  // const UCLA = await Campuses.create({
  //   name: 'UCLA',
  //   imgUrl:
  //     'http://www.insidesocal.com/ucla/files/2017/06/UCLA_WW_PRI_LOGO_ON_WHT.jpg',
  //   address: '2164 Hollywood Boulevard',
  //   description:
  //     'This school is for the person who wants to live in LA forever. You will have the whole city as your campus.'
  // })

  // const hannah = await Students.create({
  //   firstName: 'Hannah',
  //   lastName: 'Greenberg',
  //   email: 'hannah@gmail.com',
  //   imgUrl:
  //     'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/06/make_impossible_possible_adobe_stock_final_lead_0.jpg',
  //   gpa: 3.6,
  //   campusId: 2
  // })

  // const zack = await Students.create({
  //   firstName: 'Zachary',
  //   lastName: 'Smith',
  //   email: 'zack@gmail.com',
  //   imgUrl:
  //     'https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-57-5a3bb7ba3c266__700.jpg',
  //   gpa: 2.8,
  //   campusId: 1
  // })
  // seed your database here!

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh no! Something went wrong!'))
  console.error(err)
  db.close()
})
