import React, { useState } from 'react';
import '../App.css';
import Header from '../Header.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [mfaModalOpen, setMfaModalOpen] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [verifyingMfa, setVerifyingMfa] = useState(false);
  const [mfaError, setMfaError] = useState('');
  const [pendingRoleId, setPendingRoleId] = useState(null);
  const [mfaMethod, setMfaMethod] = useState('email');
  const [mfaStep, setMfaStep] = useState(0); // 0 = choose method, 1 = enter code
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');


  // Handles the initial login request
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.otp_required) {
          if (data.role_Id) setPendingRoleId(data.role_Id);
          setUserEmail(data.email || 'No email on file');
          setUserPhone(data.phone || 'No phone on file');
          setMfaModalOpen(true);
          setMfaStep(0); // Start at method selection
        }
      } else {
        console.error('Login failed:', data.error || data.detail);
        alert(data.error || data.detail);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Dummy: simulate sending OTP and advance to code entry
  const handleSendOtp = async (method) => {
    setMfaMethod(method);
    setMfaStep(1);
    setMfaError('');
    // Here you would call your backend to send the OTP to the selected method
    // e.g., await fetch('/api/request-otp/', { ... });
  };

  // Handles MFA code verification
  const handleMfaVerify = async (e) => {
    e.preventDefault();
    setVerifyingMfa(true);
    setMfaError('');
    try {
      const response = await fetch('http://localhost:8000/api/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, token: mfaCode, method: mfaMethod }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.access) localStorage.setItem('access_token', data.access);
        if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
        const roleIdToStore = data.role_Id || pendingRoleId;
        if (roleIdToStore) localStorage.setItem('role_Id', roleIdToStore);
        setMfaModalOpen(false);
        setMfaCode('');
        setMfaStep(0);
        redirectByRole(roleIdToStore);
      } else {
        setMfaError(data.error || data.detail || "Invalid MFA code.");
      }
    } catch (error) {
      setMfaError("Something went wrong. Please try again.");
    }
    setVerifyingMfa(false);
  };

  // Redirect user based on role_Id
  const redirectByRole = (roleId) => {
    if (roleId === 1 || roleId === "1") {
      navigate('/Admin');
    } else if (roleId === 2 || roleId === "2" || roleId === 3 || roleId === "3") {
      navigate('/Dashboard');
    } else {
      navigate('/Inventory');
    }
  };

  return (
    <>
      <div className='w-full h-[120px] bg-red-500 text-white top-0 flex flex-row justify-evenly items-center px-8'>
        <div className='font-mono font-bold text-xl w-full flex justify-center items-center'>
          MISFITS COMPANY DATABASE
        </div>
      </div>
      <div className='w-[400px] h-[500px] flex mx-auto bg-red-500 mt-[150px] text-center justify-center border-2 border-black rounded-3xl'>
        <div className='text-white mt-[100px]'>
          <div className='font-mono text-2xl'>Login</div>
          <form onSubmit={handleLogin}>
            <div className='flex flex-col mt-[20px]'>
              <label className='text-lg text-justify mb-[5px] font-mono'>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className='w-[200px] h-[35px] bg-white border-[1px] text-black'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
            </div>
            <div className='flex flex-col mt-[20px]'>
              <label className='text-lg text-justify mb-[5px] font-mono'>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className='w-[200px] h-[35px] bg-white border-[1px] text-black'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className='w-[100px] p-3 bg-white border-[1px] text-black mt-[20px]'
            >
              Enter
            </button>
          </form>
        </div>
      </div>
      {mfaModalOpen && (
        <MFAModal
          mfaStep={mfaStep}
          setMfaStep={setMfaStep}
          mfaMethod={mfaMethod}
          setMfaMethod={setMfaMethod}
          onSendOtp={handleSendOtp}
          mfaCode={mfaCode}
          setMfaCode={setMfaCode}
          mfaError={mfaError}
          verifyingMfa={verifyingMfa}
          onClose={() => {
            setMfaModalOpen(false);
            setMfaStep(0);
            setMfaError('');
            setMfaCode('');
          }}
          onVerify={handleMfaVerify}
          userEmail={userEmail}
          userPhone={userPhone}
        />
      )}
    </>
  );
}

// MFA Modal component with method selection
function MFAModal({
  mfaStep, mfaMethod, setMfaMethod, onSendOtp,
  mfaCode, setMfaCode, mfaError, verifyingMfa, onClose, onVerify,
  userEmail, userPhone
}) {
  if (mfaStep === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
        <div className="bg-white p-6 rounded-lg w-[350px] shadow-lg border-2 border-black">
          <h2 className="text-lg font-bold mb-3">Choose MFA Method</h2>
          <p className="mb-4 text-sm text-center text-gray-700">
            Where do you want to receive your verification code?
          </p>
          <div className="flex flex-col gap-2">
            <button
              className={`px-4 py-2 rounded ${mfaMethod === 'email' ? 'bg-red-700 text-white' : 'bg-gray-200'}`}
              onClick={() => onSendOtp('email')}
            >
              Email
            </button>
            <button
              className={`px-4 py-2 rounded ${mfaMethod === 'phone' ? 'bg-red-700 text-white' : 'bg-gray-200'}`}
              onClick={() => onSendOtp('phone')}
            >
              Phone
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded mt-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  // Step 1: Enter code
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="bg-white p-6 rounded-lg w-[350px] shadow-lg border-2 border-black">
        <h2 className="text-lg font-bold mb-3">Multi-Factor Authentication</h2>
        <p className="mb-4 text-sm text-center text-gray-700">
          A verification code has been sent to your {mfaMethod}.
          <br />Please enter it below to continue.
        </p>
        <form onSubmit={onVerify}>
          <input
            type="text"
            placeholder="Enter MFA Code"
            className="w-full p-2 border border-gray-300 rounded mb-3 text-black"
            value={mfaCode}
            onChange={e => setMfaCode(e.target.value)}
            disabled={verifyingMfa}
          />
          {mfaError && <div className="text-red-500 mb-2">{mfaError}</div>}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onClose}
              disabled={verifyingMfa}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-700 text-white rounded"
              disabled={verifyingMfa}
            >
              {verifyingMfa ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;