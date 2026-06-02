import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { loginUser } from '../../services/UserService';   // ← Make sure this path is correct

const inputClasses =
  'mt-2 w-full rounded-xl border border-[#002147]/20 bg-white px-4 py-3 text-sm text-[#002147] outline-none transition placeholder:text-zinc-400 focus:border-[#FFD100] focus:ring-2 focus:ring-[#FFD100]/20';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] font-bold tracking-[0.2em] uppercase';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (event) => {
  event.preventDefault();
  setError('');
  setLoading(true);

  try {
    const { data } = await loginUser({ email, password });

    // === REQUIREMENT 1: BLOCK VIEWERS ===
    if (data.type === 'viewer') {
      setError('Viewers are not allowed to log in to the dashboard.');
      setLoading(false);
      return;
    }

    // Save to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('type', data.type);
    localStorage.setItem('isLoggedIn', 'true');

    alert('Login successful!');
    navigate('/dashboard');   // ← go directly to dashboard

  } catch (err) {
    console.error('Login failed:', err);
    setError(err.response?.data?.message || 'Invalid email or password.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold tracking-tight text-[#002147] sm:text-4xl">Welcome Back!</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Enter your details to access your AGAP account.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-semibold text-[#002147]">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            required
            placeholder="Enter your email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-semibold text-[#002147]">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            required
            placeholder="Enter your password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-xs font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

        <Button 
            type="submit" 
            disabled={loading}
            className={`${actionButtonClassName} bg-[#002147] text-white hover:bg-[#FFD100] hover:text-[#002147] border-2 border-[#002147] transition-all`}
        >
          {loading ? 'Signing In...' : 'SIGN IN'}
        </Button>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Don’t have an account?{' '}
        <Link to="/auth/signup" className="font-bold text-[#002147] underline decoration-[#FFD100] decoration-2 underline-offset-4 transition hover:text-blue-700">
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;