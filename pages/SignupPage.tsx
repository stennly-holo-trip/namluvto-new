
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mic, UserPlus } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Hesla se neshodují.");
    }
    
    setError('');
    setLoading(true);

    try {
      await signup(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "Registrace se nezdařila.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Mic className="mx-auto h-12 w-auto text-primary" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-tertiary">
            Vytvořte si nový účet
          </h2>
          <p className="mt-2 text-center text-sm text-tertiary/90">
            Nebo <Link to="/login" className="font-medium text-primary hover:text-secondary">se přihlaste</Link>, pokud již účet máte
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}
          <div className="rounded-md shadow-sm">
            <div className="mb-2">
              <label htmlFor="email-address" className="sr-only">E-mailová adresa</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-tertiary/60 text-tertiary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="E-mailová adresa"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="sr-only">Heslo</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-tertiary/60 text-tertiary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Potvrzení hesla</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-tertiary/60 text-tertiary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Potvrzení hesla"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-secondary group-hover:text-primary" />
              </span>
              {loading ? 'Registrace...' : 'Zaregistrovat se'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
