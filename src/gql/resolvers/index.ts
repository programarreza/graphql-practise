import { db } from "../../db.js";

export const resolvers = {
	// query-1
	Query: {
		products: () => db.products,
		product: (parent: any, args: { productId: string }, context: any) => {
			return db.products.find(product => product.id === args.productId)
		},

		categories: () => db.categories,
		category: (parent: any, args: { categoryId: string }, context: any) => {
			return db.categories.find(category => category.id === args.categoryId)
		}
	},

	// query-2 => relation product to category => one-to-one
	Product: {
		category: ({ categoryId }, args: any, context: any) => {
			return db.categories.find(category => category.id === categoryId)
		},
		reviews: ({ id }, args: any, context: any) => {
			return db.reviews.filter(review => review.productId === id)
		}
	},

	// query-3  => relation category to products => one-to-many
	Category: {
		products: ({ id }, args: any, context: any) => {
			return db.products.filter(product => product.categoryId === id)
		}
	}
};
