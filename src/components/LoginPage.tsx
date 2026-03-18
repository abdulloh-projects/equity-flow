import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ChevronDown, ArrowLeft, Shield, Smartphone, X } from 'lucide-react';

interface LoginPageProps {
  onBackToHome?: () => void;
}

export default function LoginPage({ onBackToHome }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Minimal Navbar */}
      <nav className="bg-white border-b border-[#DCE3E8] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#0F1720]">EquityFlow</h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
              {/* Language Dropdown */}
              <button className="flex items-center gap-2 text-[#0F1720] hover:text-[#274060] transition-colors duration-200">
                <span className="font-medium">EN</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Back to Home */}
              <button 
                onClick={onBackToHome}
                className="flex items-center gap-2 text-[#274060] hover:text-[#3A5A7A] transition-colors duration-200 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Login Section */}
      <div className="flex-1 flex">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-[#DCE3E8] p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F1720] mb-3">
                  Welcome Back
                </h2>
                <p className="text-[#6B7A8C]">
                  Sign in to manage your investments and startup portfolio.
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#0F1720] mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[#6C7A89]" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="block w-full pl-12 pr-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-[#0F1720] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[#6C7A89]" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="block w-full pl-12 pr-12 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-[#6C7A89] hover:text-[#274060]" />
                      ) : (
                        <Eye className="h-5 w-5 text-[#6C7A89] hover:text-[#274060]" />
                      )}
                    </button>
                  </div>
                  
                  {/* Forgot Password Link */}
                  <div className="flex justify-end mt-2">
                    <button type="button" className="text-sm text-[#274060] hover:text-[#3A5A7A] font-medium transition-colors duration-200">
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {/* Remember Me & Security */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#274060] focus:ring-[#274060] border-[#DCE3E8] rounded cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-3 text-sm text-[#0F1720] cursor-pointer">
                      Remember me on this device
                    </label>
                  </div>
                  <p className="text-xs text-[#6B7A8C] flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    Your data is protected with end-to-end encryption.
                  </p>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#274060] text-white font-semibold rounded-lg hover:bg-[#3A5A7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#274060] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#DCE3E8]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#6B7A8C] font-medium">Other sign-in methods</span>
                </div>
              </div>

              {/* Other Sign-In Methods */}
              <div className="space-y-3">
                {/* Google Login */}
                <button
                  type="button"
                  className="w-full py-3 px-4 border-2 border-[#274060] text-[#274060] font-medium rounded-lg hover:bg-[#274060] hover:text-white transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                {/* LinkedIn Login */}
                <button
                  type="button"
                  className="w-full py-3 px-4 border-2 border-[#274060] text-[#274060] font-medium rounded-lg hover:bg-[#274060] hover:text-white transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Continue with LinkedIn
                </button>

                {/* Authenticator App Option */}
                <button
                  type="button"
                  onClick={() => setShow2FAModal(true)}
                  className="w-full py-3 px-4 border-2 border-[#274060] text-[#274060] font-medium rounded-lg hover:bg-[#274060] hover:text-white transition-all duration-200 flex items-start gap-3 text-left"
                >
                  <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold">Sign in with Authenticator App</div>
                    <div className="text-xs mt-1 opacity-80">Use your registered authenticator app for secure login.</div>
                  </div>
                </button>

                {/* SMS Code Option */}
                <button
                  type="button"
                  onClick={() => setShow2FAModal(true)}
                  className="w-full py-3 px-4 border-2 border-[#274060] text-[#274060] font-medium rounded-lg hover:bg-[#274060] hover:text-white transition-all duration-200 flex items-start gap-3 text-left"
                >
                  <Smartphone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold">Sign in using SMS Code</div>
                    <div className="text-xs mt-1 opacity-80">Receive a verification code via text message.</div>
                  </div>
                </button>
              </div>

              {/* Registration Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-[#6B7A8C]">
                  Don't have an account?{' '}
                  <button type="button" className="text-[#274060] font-semibold hover:text-[#3A5A7A] transition-colors duration-200">
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Branding Area */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#172A45] via-[#274060] to-[#3A5A7A] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-12">
            <div className="max-w-lg space-y-8">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Invest Smarter. Grow Faster.
              </h2>
              <p className="text-xl text-white opacity-90 leading-relaxed">
                Join a secure ecosystem where investors and startups connect. Build your portfolio with verified opportunities.
              </p>

              {/* Abstract Fintech Shapes */}
              <div className="mt-12 space-y-6">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#274060]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-lg">Secure Platform</div>
                      <div className="text-white text-sm opacity-80">Bank-level encryption</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#274060]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-lg">High Returns</div>
                      <div className="text-white text-sm opacity-80">Verified opportunities</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div className="h-full w-5/6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShow2FAModal(false)}
              className="absolute top-4 right-4 text-[#0F1720] opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#274060] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#274060]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F1720] mb-2">
                Enter Verification Code
              </h3>
              <p className="text-sm text-[#6B7A8C]">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-14 text-center text-xl font-semibold border-2 border-[#DCE3E8] rounded-lg focus:border-[#274060] focus:ring-2 focus:ring-[#274060] transition-all duration-200"
                  placeholder="•"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="button"
              className="w-full py-3 px-4 bg-[#274060] text-white font-semibold rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 shadow-lg"
            >
              Verify Code
            </button>

            {/* Resend Link */}
            <div className="text-center mt-4">
              <button type="button" className="text-sm text-[#274060] hover:text-[#3A5A7A] font-medium transition-colors duration-200">
                Didn't receive code? Resend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-[#DCE3E8] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-8 text-sm text-[#6B7A8C]">
            <button className="hover:text-[#274060] transition-colors duration-200">
              Terms of Use
            </button>
            <span className="text-[#DCE3E8]">|</span>
            <button className="hover:text-[#274060] transition-colors duration-200">
              Privacy Policy
            </button>
            <span className="text-[#DCE3E8]">|</span>
            <button className="hover:text-[#274060] transition-colors duration-200">
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
