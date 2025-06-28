import '../App.css';
import Header from '../Header.jsx';
import { useState } from 'react';

function Register() {
  // Form state
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    role_id: '',
  });

  // For demonstration: list of roles (should be fetched from your backend in production)
  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Secretary" },
    { id: 3, name: "Employee" },
  ];

  // Handle input change
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit - you should connect this to your backend API
  const handleSubmit = async (e) => {
        e.preventDefault();

        // Create formData or plain object as needed by backend
        const data = {
            User_name: form.fullname,
            username: form.username,
            password: form.password,
            email: form.email,
            mobile_phone: form.phone,
            role_id: form.role_id,
        };

        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const text = await response.text(); // Get raw response for debugging

            // Try to parse JSON if any
            let json;
            try {
            json = JSON.parse(text);
            } catch {
            json = null;
            }

            if (response.ok) {
            alert('Registration successful: ' + text);
            } else {
            alert('Registration failed: ' + (json ? JSON.stringify(json) : text));
            }
        } catch (error) {
            alert('An error occurred: ' + error);
        }
    };

  return (
    <>
      <Header />
      <div className="w-[1400px] mx-auto bg-white h-[1100px] flex flex-col p-8">
        <div className="w-[500px] flex justify-center mx-auto flex-col items-center">
          <div className="mt-[20px]">
            <span className="font-mono text-2xl">Register an Employee</span>
          </div>
          <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col">
            <div className='flex flex-col mt-[20px] '>
              <label className='text-lg text-justify mb-[5px] font-mono'>Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                className='w-[200px] h-[35px] bg-white border-[1px] text-black'
                required
              />
            </div>
            <div className='flex flex-col mt-[20px]'>
              <label className='text-lg text-justify mb-[5px] font-mono'>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className='w-[200px] h-[35px] bg-white border-[1px] text-black'
                required
              />
            </div>
            <div className='flex flex-col mt-[20px]'>
              <label className='text-lg text-justify mb-[5px] font-mono'>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className='w-[200px] h-[35px] bg-white border-[1px] text-black'
                required
              />
            </div>
            <div className='flex flex-col mt-[20px]'>
              <label className='text-lg text-justify mb-[5px] font-mono'>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className='w-[200px] h-[35px] bg-white border-[1px] text-black'
                required
              />
            </div>
            <div className='flex flex-col mt-[20px]'>
              <label className='text-lg text-justify mb-[5px] font-mono'>Phone </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className='w-[200px] h-[35px] bg-white border-[1px] text-black'
                required
              />
            </div>
            <div className='flex flex-col mt-[20px]'>
              <label className='text-lg text-justify mb-[5px] font-mono'>Role</label>
              <select
                id="role_id"
                name="role_id"
                value={form.role_id}
                onChange={handleChange}
                className='w-[200px] h-[35px] bg-white border-[1px] text-black'
                required
              >
                <option value="" disabled>Select a role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className='w-[200px] p-3 bg-white border-[1px] text-black mt-[20px]'
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;