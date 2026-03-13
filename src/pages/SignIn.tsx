import { useState } from "react"
import { Link } from "react-router"
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { FcGoogle } from "react-icons/fc"

import app from "../firebase/firebase"

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const SignIn = () => {
    const [email,setEmail] =useState<string>("")
    const [password,setPassword] = useState<string>("")
    const handleSubmit = () => {
      if (email === '' || password === '') {
        alert('please fill all the blanks')
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Signed in:", userCredential.user)
          window.location.href = '/'
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
      const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = '/';
          })
          .catch((error) => {
            console.log(error);
          });
      };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">

      <h1 className="text-3xl font-bold mt-6 mb-6">amazon</h1>

      <div className="bg-white border p-6 w-[350px] rounded">

        <h2 className="text-2xl mb-4">Sign in</h2>

        <label className="text-sm font-semibold">
          Email 
        </label>

        <input
          type="email"
          className="border w-full p-2 mt-1 mb-4 rounded"
          onChange={(e) => {setEmail(e.target.value)}}
        />

        <label className="text-sm font-semibold">
          Password
        </label>

        <input
          type="password"
          className="border w-full p-2 mt-1 mb-4 rounded"
          onChange={(e) => {setPassword(e.target.value)}}
        />

        <button className="w-full bg-yellow-400 hover:bg-yellow-500 p-2 rounded" onClick={() => {handleSubmit()} }>
          Continue
        </button>
        <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-3 w-full max-w-sm 
      bg-white border border-gray-300 rounded-lg 
      px-6 py-3 font-medium text-gray-700
      shadow-sm transition-all duration-200
      hover:shadow-md hover:bg-gray-50 active:scale-[0.98]"
    >
      <FcGoogle size={22} />
      Sign in with Google
    </button>
        <p className="text-xs mt-4">
          By Continuing, you agree to Amazon's Conditions of Use
          and Privacy Notice.
        </p>

      </div>

      <div className="flex items-center gap-2 mt-6 w-[350px]">
        <div className="flex-1 h-[1px] bg-gray-300"></div>
        <p className="text-sm text-gray-500">New to Amazon</p>
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>

      <Link
        to="/signup"
        className="border w-[350px] text-center p-2 mt-4 rounded bg-gray-100 hover:bg-gray-200"
      >
        Create Your Amazon account
      </Link>

    </div>
  )
}

export default SignIn