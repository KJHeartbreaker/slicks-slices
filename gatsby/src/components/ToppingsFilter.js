import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 4rem;

	a {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 0 1rem;
		align-items: center;
		padding: 5px;
		background: var(--grey);
		border-radius: 2px;
		font-size: clamp(1.5rem, 1.4vw, 2.5rem);

		.count {
			background: #fff;
			padding: 2px 5px;
		}

		&[aria-current='page'] {
			background: var(--yellow);
		}
	}
`

function countPizzasInToppings(pizzas) {
	// return pizzas with counts
	const counts = pizzas
		.map((pizza) => pizza.toppings)
		.flat()
		.reduce((acc, topping) => {
			// Check if this is an existing topping
			const existingTopping = acc[topping.id]

			if (existingTopping) {
				// If it is, increment by one
				existingTopping.count += 1
			} else {
				// Otherwise create a new entry into the accumulator, and set it to one
				acc[topping.id] = {
					id: topping.id,
					name: topping.name,
					count: 1,
				}
			}

			return acc
		}, {})
	// Sort based on their count
	const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count)
	return sortedToppings
}

export default function ToppingsFilter({ activeTopping }) {
	// Get a list of toppings
	// Get a list of all pizzas with their toppings
	const { pizzas } = useStaticQuery(graphql`
		query {
			pizzas: allSanityPizza {
				nodes {
					toppings {
						name
						id
					}
				}
			}
		}
	`)

	// Count how many pizzas are in each topping
	const toppingsWithCounts = countPizzasInToppings(pizzas.nodes)

	// Loop over the list of toppings and display the topping and count of pizzas in that topping

	// Profit!

	return (
		<ToppingsStyles>
			<Link to="/pizzas">
				<span className="name">All</span>
				<span className="count">{pizzas.nodes.length}</span>
			</Link>
			{toppingsWithCounts.map((topping) => (
				<Link to={`/topping/${topping.name}`} key={topping.id}>
					<span className="name">{topping.name}</span>
					<span className="count">{topping.count}</span>
				</Link>
			))}
		</ToppingsStyles>
	)
}
