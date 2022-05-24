import React from 'react';
import './section-2.css';
class Ecard extends React.Component {
	render() {
		return (
			<section className='section-2'>
				<h1>Fortune Cookie</h1>

				<div className='eCard'>
					<div style={{ position: 'relative' }}>
						<video controls>
							<source
								src='https://www.youtube.com/watch?v=3F2mwVDkWkk'
								type='video/mp4'
							/>
						</video>
						<h2 className='video_uppar_text'>Video 000</h2>
						<h1>
							<span>&#8364; 0,99 </span>
						</h1>
					</div>
					<div>
						<p>Surprize digital Fortune Cookie</p>
						<p>Discounted compared to Gift Shop</p>
						<p>
							Buy one here, recieve one entry
							<br />
							to the competition for free
							<br />
							See below for free entry method
						</p>
					</div>
				</div>
			</section>
		);
	}
}

export default Ecard;
