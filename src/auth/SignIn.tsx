import { Link } from "react-router"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import app from "../firebase/firebase"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

const SignIn = () => {

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "/"
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

        {/* LOGO */}

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          ShopSphere
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Sign in to your account
        </p>

        {/* FORM */}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
              .then(() => {
                window.location.href = "/"
              })
              .catch((error) => {
                console.log(error.message)
              })
          }}
        >
          {() => (

            <Form className="space-y-5">

              {/* EMAIL */}

              <div>
                <label className="text-sm text-gray-300">
                  Email
                </label>

                <Field
                  type="email"
                  name="email"
                  className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label className="text-sm text-gray-300">
                  Password
                </label>

                <Field
                  type="password"
                  name="password"
                  className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
                />

                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-white font-semibold transition"
              >
                Sign In
              </button>

            </Form>

          )}
        </Formik>

        {/* DIVIDER */}

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* GOOGLE BUTTON */}

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full 
          bg-slate-800 border border-slate-700 rounded-lg 
          px-6 py-2 text-gray-200 hover:bg-slate-700 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* SIGN UP */}

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?
        </p>

        <Link
          to="/signup"
          className="block text-center mt-2 bg-slate-800 border border-slate-700 py-2 rounded-lg text-white hover:bg-slate-700 transition"
        >
          Create Account
        </Link>

      </div>

    </div>
  )
}

export default SignIn
