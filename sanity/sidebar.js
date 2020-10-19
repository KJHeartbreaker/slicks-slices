import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

// build a custom sidebar
export default function Sidebar() {
	return S.list()
		.title(`Slick's Slices`)
		.items([
			// Create a new subitem
			S.listItem()
				.title('Home Page')
				.icon(() => <strong>🔥</strong>)
				.child(
					S.editor()
						.schemaType('storeSettings')
						// Make a new document ID so it's not a random number string
						.documentId('downtown')
				),
			// add in the rest of the document items
			...S.documentTypeListItems().filter((item) => item.getId() !== 'storeSettings'),
		])
}
