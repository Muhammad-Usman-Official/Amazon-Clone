export const initialState = {
    basket: [],
};

const reducer = (state, action) => {
    switch (action.type) {
		case 'ADD_TO_BASKET':
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		case 'EMPTY_BASKET':
			return {
				...state,
				basket: [],
			};
		case 'REMOVE_FROM_BASKET':
			const index = state.basket.findIndex(
				(item) => item.key === action.key
			);
			let newBasket = [...state.basket];
			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				alert(
					`Cannot remove product (id: ${action.id}) as it is not in the basket`
				);
			}
			return {
				...state,
				basket: newBasket,
			};
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			};
	}
};

export default reducer;
