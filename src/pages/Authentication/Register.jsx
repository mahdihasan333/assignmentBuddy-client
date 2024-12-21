import Lottie from "react-lottie";
import registerLottieData from "../../assets/lottie/Register.json";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    // <div className="hero bg-base-200 min-h-screen">
    //   <div className="hero-content flex-col lg:flex-row-reverse">
    //     <div className="text-center lg:text-left w-80">
    //       {/* <Lottie animationData={registerLottieData}></Lottie> */}
    //     </div>
    //     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    //       <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
    //       <form className="card-body">
    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text">Email</span>
    //           </label>
    //           <input
    //             type="email"
    //             name="email"
    //             placeholder="email"
    //             className="input input-bordered"
    //             required
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text">Password</span>
    //           </label>
    //           <input
    //             type="password"
    //             name="password"
    //             placeholder="password"
    //             className="input input-bordered"
    //             required
    //           />
    //           <label className="label">
    //             <a href="#" className="label-text-alt link link-hover">
    //               Forgot password?
    //             </a>
    //           </label>
    //         </div>
    //         <div className="form-control mt-6">
    //           <button className="btn btn-primary">Register</button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-base-200">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form  className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
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
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="text"
                placeholder="PhotoURL"
                name="photo"
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
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <p className="text-center p-5 font-semibold">
            Already Have An Account ?{" "}
            <Link className="text-green-500 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
