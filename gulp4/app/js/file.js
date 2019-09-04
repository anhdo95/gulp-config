class File {
  static getBase64 = (img) => {
    return new Promise(function (resolve) {
      var reader = new FileReader()
      reader.addEventListener('load', function() {
        resolve(reader.result)
      })
      reader.readAsDataURL(img)
    })
  }

  static bytesToMb = (bytes) => {
    return bytes / 1024 / 1024
  }
}

export default File
