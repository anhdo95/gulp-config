import constants from './constants'
import File from './file'

console.log('constants.AUTH.ACCESS_TOKEN', constants.AUTH.ACCESS_TOKEN)
console.log('File.bytesToMb(1024000)', File.bytesToMb(1024000))

throw new Error('Something went wrong!')