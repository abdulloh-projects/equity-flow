import { useState } from 'react';
import { ChevronDown, ArrowLeft, Check, Eye, EyeOff, Shield, TrendingUp, Users } from 'lucide-react';

interface RegisterPageProps {
  onBackToHome?: () => void;
}

export default function RegisterPage({ onBackToHome }: RegisterPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'investor' | 'founder' | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [password, setPassword] = useState('');

  const totalSteps = 5;

  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Contact Details' },
    { number: 3, label: 'Account Setup' },
    { number: 4, label: 'Role Selection' },
    { number: 5, label: 'Verification' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    if (pass.length < 6) return 25;
    if (pass.length < 10) return 50;
    if (pass.length < 14) return 75;
    return 100;
  };

  const passwordStrength = getPasswordStrength(password);

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return '#DCE3E8';
    if (passwordStrength <= 50) return '#B38B2D';
    if (passwordStrength <= 75) return '#3A5A7A';
    return '#2F6F5E';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

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

      {/* Main Registration Section */}
      <div className="flex-1 flex">
        {/* Left Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-2xl">
            {/* Registration Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-[#DCE3E8] p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F1720] mb-3">
                  Create Your Account
                </h2>
                <p className="text-[#6B7A8C]">
                  Join EquityFlow and start investing or raising capital.
                </p>
              </div>

              {/* Step Progress Indicator */}
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        {/* Step Circle */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                            step.number < currentStep
                              ? 'bg-[#274060] text-white'
                              : step.number === currentStep
                              ? 'bg-[#274060] text-white ring-4 ring-[#274060] ring-opacity-30'
                              : 'bg-[#DCE3E8] text-[#6B7A8C]'
                          }`}
                        >
                          {step.number < currentStep ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            step.number
                          )}
                        </div>
                        {/* Step Label */}
                        <div
                          className={`text-xs mt-2 text-center transition-all duration-300 ${
                            step.number <= currentStep
                              ? 'text-[#274060] font-semibold'
                              : 'text-[#6B7A8C]'
                          }`}
                        >
                          {step.label}
                        </div>
                      </div>
                      {/* Connecting Line */}
                      {index < steps.length - 1 && (
                        <div
                          className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                            step.number < currentStep
                              ? 'bg-[#274060]'
                              : 'bg-[#DCE3E8]'
                          }`}
                          style={{ marginTop: '-24px' }}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[400px]">
                {/* Step 1 - Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-[#0F1720] mb-4">
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter first name"
                          className="block w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter last name"
                          className="block w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="block w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                          Country
                        </label>
                        <select className="block w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200 bg-white">
                          <option value="">Select country</option>
                          <option value="us">United States</option>
                          <option value="uk">United Kingdom</option>
                          <option value="ca">Canada</option>
                          <option value="au">Australia</option>
                          <option value="de">Germany</option>
                          <option value="fr">France</option>
                          <option value="uz">Uzbekistan</option>
                          <option value="ru">Russia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 - Contact Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-[#0F1720] mb-4">
                      Contact Details
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="block w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="block w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                        Address <span className="text-[#6B7A8C] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your address"
                        className="block w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3 - Account Setup */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-[#0F1720] mb-4">
                      Account Setup
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full px-4 py-3 pr-12 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
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
                      
                      {/* Password Strength Indicator */}
                      {password && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-[#6B7A8C]">Password Strength</span>
                            <span className="text-xs font-semibold" style={{ color: getPasswordStrengthColor() }}>
                              {getPasswordStrengthLabel()}
                            </span>
                          </div>
                          <div className="h-2 bg-[#DCE3E8] rounded-full overflow-hidden">
                            <div
                              className="h-full transition-all duration-300 rounded-full"
                              style={{
                                width: `${passwordStrength}%`,
                                backgroundColor: getPasswordStrengthColor()
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0F1720] mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Re-enter your password"
                          className="block w-full px-4 py-3 pr-12 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060] transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-[#6C7A89] hover:text-[#274060]" />
                          ) : (
                            <Eye className="h-5 w-5 text-[#6C7A89] hover:text-[#274060]" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-start">
                        <input
                          id="terms"
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="h-4 w-4 mt-1 text-[#274060] focus:ring-[#274060] border-[#DCE3E8] rounded cursor-pointer"
                        />
                        <label htmlFor="terms" className="ml-3 text-sm text-[#0F1720] cursor-pointer">
                          I agree to the{' '}
                          <button type="button" className="text-[#274060] font-semibold hover:text-[#3A5A7A]">
                            Terms of Use
                          </button>
                          {' '}and{' '}
                          <button type="button" className="text-[#274060] font-semibold hover:text-[#3A5A7A]">
                            Privacy Policy
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4 - Role Selection */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-semibold text-[#0F1720] mb-2">
                        Select Your Role
                      </h3>
                      <p className="text-[#6B7A8C]">
                        Choose how you want to use EquityFlow
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Investor Card */}
                      <button
                        type="button"
                        onClick={() => setSelectedRole('investor')}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedRole === 'investor'
                            ? 'border-[#274060] bg-[#274060] bg-opacity-5 shadow-lg'
                            : 'border-[#DCE3E8] hover:border-[#3A5A7A] hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                              selectedRole === 'investor'
                                ? 'bg-[#274060]'
                                : 'bg-[#3A5A7A]'
                            }`}
                          >
                            <TrendingUp className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-xl font-semibold text-[#0F1720] mb-3">
                            Investor
                          </h4>
                          <p className="text-sm text-[#6B7A8C]">
                            I want to invest in startups and build my portfolio with verified opportunities.
                          </p>
                          {selectedRole === 'investor' && (
                            <div className="mt-4 w-6 h-6 bg-[#274060] rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </button>

                      {/* Startup Founder Card */}
                      <button
                        type="button"
                        onClick={() => setSelectedRole('founder')}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedRole === 'founder'
                            ? 'border-[#274060] bg-[#274060] bg-opacity-5 shadow-lg'
                            : 'border-[#DCE3E8] hover:border-[#3A5A7A] hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                              selectedRole === 'founder'
                                ? 'bg-[#274060]'
                                : 'bg-[#172A45]'
                            }`}
                          >
                            <Users className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-xl font-semibold text-[#0F1720] mb-3">
                            Startup Founder
                          </h4>
                          <p className="text-sm text-[#6B7A8C]">
                            I want to raise funding and showcase my startup to potential investors.
                          </p>
                          {selectedRole === 'founder' && (
                            <div className="mt-4 w-6 h-6 bg-[#274060] rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5 - Verification */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-[#274060] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10 text-[#274060]" />
                      </div>
                      <h3 className="text-2xl font-semibold text-[#0F1720] mb-3">
                        Verify Your Account
                      </h3>
                      <p className="text-[#6B7A8C]">
                        We've sent a verification code to your email address
                      </p>
                    </div>

                    {/* Email Verification Message */}
                    <div className="bg-[#3A5A7A] bg-opacity-10 rounded-xl p-6 border border-[#3A5A7A] border-opacity-30">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#3A5A7A] rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0F1720] mb-2">
                            Check your email
                          </h4>
                          <p className="text-sm text-[#6B7A8C] mb-3">
                            We've sent a 6-digit verification code to <span className="font-semibold">your@email.com</span>
                          </p>
                          <button type="button" className="text-sm text-[#274060] font-semibold hover:text-[#3A5A7A] transition-colors duration-200">
                            Didn't receive it? Resend code
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* OTP Input */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0F1720] mb-4 text-center">
                        Enter Verification Code
                      </label>
                      <div className="flex justify-center gap-3">
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
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-[#DCE3E8]">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-[#DCE3E8] text-[#6B7A8C] opacity-40 cursor-not-allowed'
                      : 'border-2 border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white'
                  }`}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={currentStep === totalSteps ? () => console.log('Complete registration') : handleNext}
                  className="flex-1 py-3 px-6 bg-[#274060] text-white rounded-lg font-semibold hover:bg-[#3A5A7A] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {currentStep === totalSteps ? 'Complete Registration' : 'Continue'}
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#6B7A8C]">
                  Already have an account?{' '}
                  <button type="button" className="text-[#274060] font-semibold hover:text-[#3A5A7A] transition-colors duration-200">
                    Sign In
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
                Where Innovation Meets Capital
              </h2>
              <p className="text-xl text-white opacity-90 leading-relaxed">
                Join thousands of investors and founders building the future together on EquityFlow.
              </p>

              {/* Abstract Fintech Shapes */}
              <div className="mt-12 space-y-6">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                      <Shield className="w-8 h-8 text-[#274060]" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-lg">Verified Platform</div>
                      <div className="text-white text-sm opacity-80">Secure & compliant</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-[#274060]" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-lg">Growth Potential</div>
                      <div className="text-white text-sm opacity-80">Access high-growth startups</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
