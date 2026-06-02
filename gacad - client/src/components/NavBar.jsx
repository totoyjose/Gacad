import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/styles/agap_logo.png';

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
    { label: 'Dashboard', to: '/dashboard' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300',
        isActive
            ? 'bg-[#FFD100] text-[#002147] shadow-lg shadow-amber-500/10 scale-105'
            : 'text-zinc-300 hover:text-white hover:bg-white/10',
    ].join(' ');

const NavBar = () => {
    const navigate = useNavigate();

      const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate("/auth/signin");
  };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[#FFD100] bg-[#002147]/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                
                {/* Logo + Company Name */}
                <NavLink to="/" className="flex items-center gap-3">
                    <img 
                        src={logo} 
                        alt="AGAP Logo" 
                        className="h-15 w-auto object-contain" 
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-xl tracking-tight text-white">
                            AGAP Company
                        </span>
                        <span className="text-[10px] text-zinc-400 -mt-1 tracking-widest">
                            ENGINEERING • ARCHITECTURE • PROJECTS
                        </span>
                    </div>
                </NavLink>

                {/* Navigation Links */}
                <nav className="hidden items-center gap-3 md:flex">
                    {links.map((link) => (
                        <NavLink 
                            key={link.to} 
                            to={link.to} 
                            end={link.to === '/'}
                            className={navLinkClassName}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {/* Separation Line before Logout Button */}
                    <div className="h-4 w-[1px] bg-zinc-600 mx-1" />

                    {/* Interactive Logout Action */}
                    <button 
                        onClick={handleLogout}
                        type="button"
                        className="rounded-full border border-zinc-500 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-300 hover:text-red-400 hover:border-red-400/50 hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;