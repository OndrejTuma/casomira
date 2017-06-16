import React, { Component } from 'react'
import { nextConnect } from '../store'

import Casomira from '../components/Casomira'

class Index extends Component {

	render () {
		return (
			<div>
				<Casomira from={40} breaktime={30} warning={30} critical={10} />


				<style global jsx>{`
				  body {
					background: #000;
					color: #fff;
					font-family: Arial, Helvetica, sans-serif;

					text-align: center;
				  }
				`}</style>
			</div>
		)
	}
}

export default nextConnect(state => ({
	time: state.time,
}))(Index)