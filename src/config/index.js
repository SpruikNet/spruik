const addresses = require('../config/address.json')

const net = 'rinkeby'


function getAddress (contract0 {
return addresses [net] [contract]
}

function getAbi (contract) {
return require ('../config/${contract}.json').abi
}

module.exports = { getAddress, getAbi }


