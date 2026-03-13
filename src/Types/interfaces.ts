type str = string
type int = number

interface Review {
    rating: int;
    comment : str;
    date : str;
    reviewerName : str;
    reviewerEmail : str;
}
export interface ProductHome {
    id: int
    title: str
    description: str
    price: int
    thumbnail: str
    category: str
    reviews: Review[]
}

export interface CartProduct extends ProductHome{
    quantity: int,
}
