module.exports = {
  packageData: (array, nestedArray) => {
    let tempArr = []
    let playlistIDandMovieDetails = []
    let uniqueData = {}
    let finalData = []
    nestedArray.forEach((singleArray) => {
      singleArray.forEach((movieObject) => {
        tempArr.push(movieObject)
      })
    })

    array.forEach((pair, i) => {
      playlistIDandMovieDetails.push({playlist_id: pair.playlist_playlist_id, movie: tempArr[i]})
    })

    playlistIDandMovieDetails.forEach((pair) => {
      if (!uniqueData[pair.playlist_id]) {
        uniqueData[pair.playlist_id] = [pair.movie]
      } else {
        uniqueData[pair.playlist_id].push(pair.movie)
      }
    })
    for( var key in uniqueData) {
      let tuple = [key, uniqueData[key]]
      finalData.push(tuple)
    }

    return finalData
  }
}
