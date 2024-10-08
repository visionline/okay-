<template>
  <div class="min-h-screen bg-gray-900 bg-[url('/bg.jpg')] bg-cover bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="relative isolate overflow-hidden px-6 py-12 shadow-2xl rounded-xl sm:rounded-xl xl:py-24 w-full text-center bg-gray-900 bg-opacity-75">
      
      <!-- Center the image with flexbox -->
      <div class="flex justify-center mb-4">
        <img src="/leo.jpeg" alt="Leo AI" class="h-24 w-24 object-cover rounded-full shadow-lg">
      </div>
      
      <!-- Title -->
      <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
        Create an Admin New Account
      </h2>
      
      <!-- Description -->
      <p class="mt-2 text-sm text-gray-300">
        Or
        <router-link
          to="/login"
          class="font-medium text-green-400 hover:text-green-300 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          login to Admin your account
        </router-link>
      </p>

      <!-- Registration Form -->
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form @submit.prevent="registerUser">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="fullName" name="fullName" type="text" placeholder=" Leo Joe" required class="form-input" />
            </div>
            <div class="mt-6">
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" name="email" type="email" placeholder="admin@gmail.com" required class="form-input" />
            </div>
            <div class="mt-6">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" placeholder=" password" type="password" required class="form-input" />
            </div>
            <div class="mt-6">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" placeholder=" password" type="password" required class="form-input" />
            </div>
            <div class="mt-6">
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const registerUser = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  try {
    const response = await axios.post('https://leo-backend-7mm5.onrender.com/api/v1/user/register', {
      fullName,
      email,
      password,
      confirmPassword,
    });

    console.log('User registered successfully:', response.data);

    // Show a pop-up notification
    alert('User registered successfully. Click OK to proceed to login.');

    // Redirect to login page after successful registration
    router.push('/login');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // User already exists or other validation errors
      alert('Registration failed. Please check your information and try again.');
    } else {
      console.error('Registration failed:', error);
    }
  }
};
</script>

<style scoped>
.form-input {
  appearance: none;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.form-input:focus {
  border-color: #4f46e5; /* Tailwind's blue-600 */
  outline: 2px solid #4f46e5; /* Tailwind's blue-600 */
}
</style>

