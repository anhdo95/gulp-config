exports.default = {
  getBase64: function(img) {
    return new Promise(function (resolve) {
      var reader = new FileReader()
      reader.addEventListener('load', function() {
        resolve(reader.result)
      })
      reader.readAsDataURL(img)
    })
  },

  bytesToMb: function(bytes) {
    return bytes / 1024 / 1024
  }
}
