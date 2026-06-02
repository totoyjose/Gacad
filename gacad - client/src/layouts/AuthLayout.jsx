import { Outlet } from 'react-router-dom';

import loginHero from '../assets/styles/cardthree.jpg';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#002147] text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        
        {/* LEFT SIDE: IMAGE CONTAINER */}
        {/* LEFT SIDE: IMAGE CONTAINER */}
<div className="relative hidden items-center justify-center bg-black lg:flex"> 
  {/* THE ACTUAL IMAGE - Lower opacity = Darker image */}
  <img 
    src={loginHero} 
    alt="NU Bulldogs" 
    className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity duration-500"
  />
  
  {/* OPTIONAL: Extra Gradient Overlay for maximum readability at the bottom */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-black/40" />
  
  {/* BRAND OVERLAY CONTAINER */}
  <div className="relative z-10 flex w-full max-w-md flex-col items-start p-12">
    <div className="h-1.5 w-20 bg-[#FFD100] mb-4 shadow-lg" />
    <h2 className="text-5xl font-bold text-white leading-tight drop-shadow-2xl">
      AGAP COMPANY <br /> 
      <span className="text-[#FFD100]">Visit Us.</span>
    </h2>
    <p className="mt-4 text-blue-50 font-medium text-lg drop-shadow-md">
      Official website of AGAP Company.
    </p>
  </div>
</div>

        {/* RIGHT SIDE: THE FORM (SignIn/SignUp) */}
        <main className="flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;