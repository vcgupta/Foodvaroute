export interface ICategories{
    name: string,
    image: string,
    id:string
}

export interface IRecipes{
    id: string,
    name: string,
    image: string,
    price: number,
    category: string,
    rating: number,
    reviews: number,
    details: string,
    isFavourite: boolean
}

export interface IFilter{
    category: string
}

export interface ICart{
    id: string,
    quantity: number
}

export interface ICartCollection{
    [key:string]: ICart
}

export interface IStoreState{
    categories: ICategories[],
    cartItems: ICartCollection,
    recipeList: IRecipes[]
}