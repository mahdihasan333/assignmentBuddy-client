import { Link } from 'react-router-dom';
import google from "../../assets/image/Google.webp";


const Login = () => {



  // email and password validation
  const handleSignIn = e => {
    e.preventDefault();
    const form = e.target;
  }
    return (
        <div className="bg-base-200">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div  className="btn flex">
              <img className="h-10 w-10 rounded-full" src={google} alt="" />
              <p>Login With Google</p>
            </div>
          </form>
          <p className="text-center p-5 font-semibold">
            Don't Have An Account ?{" "}
            <Link className="text-green-500 hover:underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Login;