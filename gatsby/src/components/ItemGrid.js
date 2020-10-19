import React from 'react'
import { ItemsGrid, ItemStyles } from '../styles/Grids'

export default function ItemGrid({ items }) {
	return (
		<ItemsGrid>
			{items.map((item) => (
				<ItemStyles>
					<p>
						<span className="mark">{item.name}</span>
					</p>
					<img
						src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
						alt={item.name}
						height="500"
						width="400"
						style={{
							background: `url(${item.image.asset.metadata.lqip})`,
							backgroundSize: 'cover',
						}}
					/>
				</ItemStyles>
			))}
		</ItemsGrid>
	)
}
