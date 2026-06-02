import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';   // ← added

const inputClasses = 'mt-2 w-full rounded-xl border border-[#002147]/20 bg-white px-4 py-3 text-sm text-[#002147] outline-none transition placeholder:text-zinc-400 focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/20';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] font-bold tracking-[0.2em] uppercase';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',           // required by backend
    type: 'viewer',         // new users start as viewer
    age: '20',
    gender: 'male',
    contactNumber: '',
    address: '',
    isActive: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createUser(formData);
      alert("Registration successful! You can now sign in.");
      navigate('/auth/signin');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold tracking-tight text-[#002147] sm:text-4xl">Join the AGAP Company</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Create an account to access our exclusive website.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSignUp}>
        {error && <p className="text-xs font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm font-semibold text-[#002147]">First Name</label>
            <input id="firstName" type="text" required placeholder="Juan" className={inputClasses} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-semibold text-[#002147]">Last Name</label>
            <input id="lastName" type="text" required placeholder="Dela Cruz" className={inputClasses} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label htmlFor="username" className="text-sm font-semibold text-[#002147]">Username</label>
          <input id="username" type="text" required placeholder="username123" className={inputClasses} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-[#002147]">University Email</label>
          <input id="email" type="email" required placeholder="student@national-u.edu.ph" className={inputClasses} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-semibold text-[#002147]">Password</label>
          <input id="password" type="password" required placeholder="••••••••" className={inputClasses} onChange={handleChange} />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className={`${actionButtonClassName} bg-[#FFD100] text-[#002147] hover:bg-[#002147] hover:text-white border-2 border-[#FFD100] transition-all`}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-bold text-[#002147] underline decoration-[#FFD100] decoration-2 underline-offset-4 transition hover:text-blue-700">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;