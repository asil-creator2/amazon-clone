import { useState } from "react"
import { Link } from "react-router"
import { getAuth, createUserWithEmailAndPassword, updateProfile ,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import app from "../firebase/firebase"
import { FcGoogle } from "react-icons/fc"

const provider = new GoogleAuthProvider();
const auth = getAuth(app)

const SignUp = () => {

  const [name,setName] = useState<string>("")
  const [email,setEmail] =useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [rePassword,setRePassword] = useState<string>("")

  const handleSubmit = async () => {
    if(password !== rePassword){
      alert("Passwords do not match")
      return
    }
    if (email === '' || password === '') {
        alert('please fill all the blanks')
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user)

      await updateProfile(user, {
        displayName: name
      });

      console.log("User created:", user);
      window.location.href = '/';
    } catch(error: any) {
      console.log(error.message);
    }
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

        <h2 className="text-2xl mb-4">Create Account</h2>

        <label className="text-sm font-semibold">
          Your Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border w-full p-2 mt-1 mb-4 rounded"
        />

        <label className="text-sm font-semibold">
          Email Address
        </label>

        <input
          type="text"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border w-full p-2 mt-1 mb-4 rounded"
        />

        <label className="text-sm font-semibold">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border w-full p-2 mt-1 mb-4 rounded"
        />

        <label className="text-sm font-semibold">
          Re-enter Password
        </label>

        <input
          type="password"
          value={rePassword}
          onChange={(e)=>setRePassword(e.target.value)}
          className="border w-full p-2 mt-1 mb-4 rounded"
        />

        <p className="text-xs mb-3">
          Passwords must be at least 6 characters.
        </p>

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 hover:bg-yellow-500 p-2 rounded"
        >
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
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  )
}

export default SignUp