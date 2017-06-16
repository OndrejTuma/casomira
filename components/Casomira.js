import { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { setTime } from '../redux/actions'

class Casomira extends Component {

	getMinutes () {
		const { time } = this.props

		return Math.floor(time / 60)
	}
	getSeconds () {
		const { time } = this.props

		let seconds = time % 60

		return `${seconds < 10 ? 0 : ''}${seconds}`
	}
	getTime () {
		return `${this.getMinutes()}:${this.getSeconds()}`
	}
	playGong () {
		this.gong.play()
	}
	reset () {
		const { dispatch, from } = this.props

		this.stop()
		this.breaktime = false
		dispatch(setTime(from))
	}
	start () {
		this.stop()
		this.interval = setInterval(() => this._refresh(), 1000)
	}
	stop () {
		clearInterval(this.interval)
	}

	_refresh () {
		const { dispatch, time, from, breaktime } = this.props

		if (time <= 0) {
			let newTime

			this.stop()
			this.playGong()

			if (this.breaktime) {
				this.breaktime = false
				newTime = from
			}
			else {
				this.breaktime = true
				newTime = breaktime
			}
			dispatch( setTime(newTime) )

			setTimeout(() => {
				if (this.breaktime) {
					this.start()
				}
			}, 2000)
		}
		else {
			dispatch( setTime(time - 1) )
		}
	}


	componentDidMount () {
		this.breaktime = false
		this.gong = new Audio(`./static/gong.mp3`)
		this.reset()
	}

	render () {
		const { time, warning, critical } = this.props

		let timeClasses = classnames({
			time: true,
			warning: time <= warning,
			critical: time <= critical,
			breaktime: this.breaktime,
			zero: time <= 0,
		})
		let changeClasses = classnames({
			change: true,
			visible: this.breaktime,
		})

		return time >= 0 ? (
			<div>
				<p className={changeClasses}>Change</p>
				<h1 className={timeClasses}>{this.getTime()}</h1>
				<button onClick={() => this.start()}>Start</button>
				<button onClick={() => this.stop()}>Stop</button>
				<button onClick={() => this.reset()}>Reset</button>

				<style global jsx>{`
				  .change { opacity: 0; font-size: 30px; margin-top: 60px; text-transform: uppercase; transition: all .5s; }
				  .change.visible { opacity: 1; }
				  .time { font-size: 150px; margin: 50px 0 100px; transition: all .3s; }
				  .time.warning { animation: warning 1s infinite; }
				  .time.critical { animation: critical 1s infinite; }
				  .time.breaktime { animation: none; }
				  .time.zore { animation: none; }

				  @keyframes warning {
				  	0% { color: #fff; }
				  	50% { color: orange; }
				  	100% { color: #fff; }
				  }
				  @keyframes critical {
				  	0% { color: #fff; }
				  	50% { color: red; }
				  	100% { color: #fff; }
				  }
				`}</style>
			</div>
		) : <p>loading...</p>
	}

}

export default connect(state => ({
	time: state.time,
}))(Casomira)