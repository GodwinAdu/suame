export const formattLetter = (text) => {
    if (text.length === 0) return ''; // Handle the case when the input is empty
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  export const isEmailValid = (email) => {
    // Simple email validation using regex pattern
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  export const isPasswordValid = (password) => {
    // Define your password validation rules here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialCharacter
    );
  };

  export const calculatePasswordStrength = (password) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password) ? 25 : 0;
    const hasLowercase = /[a-z]/.test(password) ? 25 : 0;
    const hasNumber = /\d/.test(password) ? 20 : 0;
    const hasSpecialCharacter = /[!@#$%^&*]/.test(password) ? 20 : 0;
    const hasMinLength = password.length >= minLength ? 10 : 0;
  
    const strength =
      hasUppercase + hasLowercase + hasNumber + hasSpecialCharacter + hasMinLength;
    const maxStrength = 100;
  
    return Math.min(maxStrength, Math.floor((strength / maxStrength) * 100));
  };

  
  export const getColor = (strength) => {
    if (strength >= 80) {
      return 'green';
    } else if (strength >= 60) {
      return 'limegreen';
    } else if (strength >= 40) {
      return 'orange';
    } else {
      return 'red';
    }
  };

//   <style>
//      {`
//          progress {
//         width: 100%;
//         height: 15px;
//     }

//     progress::-webkit-progress-value {
//     background-color: ${getColor(passwordStrength)};
//         }
// `}
// </style>

export const handlePhoneNumberChange = (event) => {
    // Remove all non-numeric characters from the entered phone number
    const cleanedNumber = event.target.value.replace(/\D/g, '');

    // Concatenate the "+233" country code with the cleaned number
    setPhoneNumber('+233' + cleanedNumber);
  };


  
  