import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import type { User } from "firebase/auth"

const getInitials = (name: string | null) => {
  if (!name) return ""

  const words = name.split(" ")

  const initials = words
    .map(word => word[0])
    .join("")
    .toUpperCase()

  return initials
}


const UserPage = () => {

  const [user,setUser] = useState<User | null>(null)
    const initials = getInitials(user?.displayName || "")
  const auth = getAuth()

  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
    })

    return () => unsubscribe()

  },[])

  const handleLogout = async () => {

    await signOut(auth)

  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-[350px]">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Your Account
        </h1>
        <div className="flex justify-center mb-6">

            <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">

                {initials}

            </div>

        </div>
        {user ? (

          <div className="space-y-4">

            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-semibold">{user.displayName}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded mt-4 cursor-pointer hover:bg-red-700 transition ease-in-out duration-150"
            >
              Logout
            </button>

          </div>

        ) : (

          <p className="text-center text-gray-500">
            No user logged in
          </p>

        )}

      </div>

    </div>

  )

}

export default UserPage