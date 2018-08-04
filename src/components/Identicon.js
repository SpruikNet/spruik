import React from 'react'
import Blockies from 'blockies'

import './Identicons.css'

function Identicon (props) {
const address = props.address ||  ''
const size = props.size || 8
const scale = props.scale || 8

const dataUrl = blockies ({
seed: address.toLowerCase(),
size,
scale
}).toDataUrl()

return (
<div className= 'Identicon'>
<img src={dataUrl} alt='' />
</div>

	) 
}
export default Identicon
