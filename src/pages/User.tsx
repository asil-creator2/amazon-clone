import { useEffect, useState } from "react"
import Swal from "sweetalert2"
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

  const [user, setUser] = useState<User | null>(null)
  const auth = getAuth()

  const initials = getInitials(user?.displayName || "")

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()

  }, [])

const handleLogout = async () => {

  const result = await Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "warning",

    background: "#0f172a", // slate-900
    color: "#ffffff",

    showCancelButton: true,

    confirmButtonText: "Yes, logout",
    cancelButtonText: "Cancel",

    confirmButtonColor: "#dc2626", // red
    cancelButtonColor: "#4f46e5", // indigo

    customClass: {
      popup: "rounded-xl",
    }
  })

  if (result.isConfirmed) {

    await signOut(auth)

    Swal.fire({
      title: "Logged out",
      text: "You have been logged out successfully",
      icon: "success",
      background: "#0f172a",
      color: "#ffffff",
      confirmButtonColor: "#4f46e5"
    })

  }

}


  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-950 px-4">

      <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl p-8 w-[380px]">

        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Your Account
        </h1>

        {/* Avatar */}

        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
            {initials}
          </div>

        </div>

        {user ? (

          <div className="space-y-5">

            {/* Name */}

            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">

              <p className="text-gray-400 text-sm">
                Name
              </p>

              <p className="font-semibold text-white">
                {user.displayName}
              </p>

            </div>

            {/* Email */}

            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">

              <p className="text-gray-400 text-sm">
                Email
              </p>

              <p className="font-semibold text-white">
                {user.email}
              </p>

            </div>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-4 transition"
            >
              Logout
            </button>

          </div>

        ) : (

          <p className="text-center text-gray-400">
            No user logged in
          </p>

        )}

      </div>

    </div>

  )

}

export default UserPage
