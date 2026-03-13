import { useSelector, useDispatch } from "react-redux"
import type { ProductHome } from "../Types/interfaces"
import { toggleFavorites } from "../Redux/slices/favoritesSlice"
import type { RootState } from "../Redux/store"
import type { AppDispatch } from "../Redux/store"

const Favorites = () => {

  const favorites = useSelector((state : RootState)=>state.favorites.favorites)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
      {favorites.length === 0 && <p>No favorites yet</p>}
      {favorites.map((item : ProductHome)=>(
        <div key={item.id} className="flex items-center gap-4 mb-4 border p-4">

          <img src={item.thumbnail} className="w-20"/>

          <div className="flex-1">
            <p className="font-semibold">{item.title}</p>
            <p>${item.price}</p>
          </div>

          <button
            onClick={()=>dispatch(toggleFavorites(item))}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Remove
          </button>

        </div>
      ))}

    </div>
  )
}

export default Favorites