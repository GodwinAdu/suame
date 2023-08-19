import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import Textarea from './TextArea';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { registerUser } from '../helper/helper';
import { Visibility, VisibilityOff, VisibilityRounded } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { calculatePasswordStrength, formattLetter, getColor, isEmailValid, isPasswordValid } from '../utils/libs';

const steps = ['Bio', 'Address', 'Cong Details'];






export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [ phone, setPhone ] = useState('+233');
  const [ phoneOne, setPhoneOne ] = useState('');
  const [ address,setAddress ] = useState('');
  const [ addressOne, setAddressOne] = useState('');
  const [ minProfile, setMinProfile ] = useState('');
  const [ group, setGroup ] = useState('');
  const [ congProfile, setCongProfile ] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);



  const navigate = useNavigate();

const togglePasswordVisibility = () => {
  setShowPassword((prevShowPassword) => !prevShowPassword);
};

const handleCloseModal = () => {
  setShowModal(false);
};


  const isStepOptional = (step) => {
    return step === 1; 
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Perform any final actions or submit the form here
      if (password === confirmPassword && isEmailValid(email)) {
        // Your registration logic here...
        try {
          const data = {
            firstName,
            middleName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender,
            address,
            addressOne,
            phone,
            phoneOne,
            group,
            congProfile,
            minProfile,
          }
          let registerPromise = registerUser(data)
          toast.promise(registerPromise,{
            loading: 'Registering...',
            success:'Registered Successfully',
            error:"Error in registering"
          })

          registerPromise.then(()=> navigate('/'))
        } catch (error) {
          console.log(error)
          
        }
      } else {
        if (!isEmailValid(email)) {
          console.error('Invalid email address.');
          toast.error('Input valid email address')
        } else {
          console.error('Password and Confirm Password do not match.');
          toast.error('Confirm password doesnot matched with password.')
        }
      }
      handleReset();
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setDateOfBirth('');
    setGender('');
    setAddress('');
    setAddressOne('');
    setPhone('');
    setPhoneOne('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCongProfile('');
    setMinProfile('');
    setGroup('');
  };

  const isStepValid = () => {
    if (activeStep === 0) {
      return firstName.trim() !== '' && lastName.trim() !== '' && dateOfBirth.trim() !== '' && gender.trim() !== '';
    } else if (activeStep === 1) {
      return address.trim() !== '' && phone.trim() !== '' ;
    } else if (activeStep === 2) {
      return congProfile.trim() !== '' && minProfile.trim() !== '' && group.trim() !=='';
    }
    return true;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box className="px-4 py-3">
            <Box sx={{ mt: 2 }}>
              {activeStep === 0 && (
                <div className='flex flex-col gap-4'>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    placeholder='Enter First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(formattLetter(e.target.value))}
                    error={!isStepValid()}
                  />
                  <TextField
                    label="Middle Name"
                    variant="outlined"
                    fullWidth
                    placeholder='Enter Middle Name (optional)'
                    value={middleName}
                    onChange={(e) => setMiddleName(formattLetter(e.target.value))}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    placeholder='Enter Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(formattLetter(e.target.value))}
                    error={!isStepValid()}
                  />
                  <TextField
                    type='email'
                    label="Email"
                    variant="outlined"
                    fullWidth
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!isStepValid()}
                  />
                  <div>
                  {password.length > 0 && (
                    <div>
                      <progress
                        max="100"
                        value={passwordStrength}
                        style={{ width: '100%', height: '15px' }}
                        className=''
                      ></progress>
                      <p>
                        Password Strength:{' '}
                        <strong style={{ color: getColor(passwordStrength) }}>
                          {passwordStrength >= 100
                            ? 'Very Strong'
                            : passwordStrength >= 80
                            ? 'Strong'
                            : passwordStrength >= 40
                            ? 'Moderate'
                            : passwordStrength >= 20
                            ? 'Weak'
                            : 'Very Weak'}
                        </strong>
                      </p>
                    </div>
                  )}
                  </div>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      const newPassword = e.target.value;
                      setPasswordStrength(calculatePasswordStrength(newPassword));
                      setPassword(newPassword);
                    }}
                    error={ passwordStrength < 100 || !isStepValid() || !isPasswordValid(password)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityRounded /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                      type={showPassword ? 'text' : 'password'}
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={passwordStrength < 100 || !isStepValid() || !isPasswordValid(password)}
                    
                    />

                  <div className="flex gap-4 " >
                    <TextField
                      type='date'
                      label="Date of Birth"
                      variant="outlined"
                      fullWidth
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      error={!isStepValid()}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={gender}
                        label="Gender"
                        placeholder='Enter your sex'
                        onChange={(e) => setGender(formattLetter(e.target.value))}
                        error={!isStepValid()}
                      >
                        <MenuItem value="">
                          <em>Your Sex</em>
                        </MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
              {activeStep === 1 && (
                <div className="flex flex-col gap-4">
                    <TextField
                        type='address'
                        label="Address"
                        variant="outlined"
                        placeholder='Enter Address'
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={!isStepValid()}
                    />
                    <TextField
                        type='address'
                        label="Address (optional)"
                        variant="outlined"
                        fullWidth
                        placeholder='Address (optional)'
                        value={addressOne}
                        onChange={(e) => setAddressOne(e.target.value)}
                    />
                    <TextField
                        type='phone'
                        label="Telephone"
                        variant="outlined"
                        placeholder='Enter phone number'
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!isStepValid()}
                    />
                    <TextField
                        type='phone'
                        label="Emergency contact"
                        placeholder='Emergency contact (optional)'
                        variant="outlined"
                        fullWidth
                        value={phoneOne}
                        onChange={(e) => setPhoneOne(e.target.value)}
                    />
                </div>
              )}
              {activeStep === 2 && (
                <div className='flex flex-col gap-4'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={group}
                            label="Gender"
                            placeholder='Enter your sex'
                            onChange={(e) => setGroup(formattLetter(e.target.value))}
                            error={!isStepValid()}
                        >
                        <MenuItem value="">
                            <em>Select your group</em>
                        </MenuItem>
                        <MenuItem value="Group one">Group one (1)</MenuItem>
                        <MenuItem value="Group two">Group two (2)</MenuItem>
                        <MenuItem value="Group three">Group three (3)</MenuItem>
                        <MenuItem value="Group four">Group four (4)</MenuItem>
                        <MenuItem value="Group five">Group five (5)</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">Congregation profile</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={congProfile}
                        label="Congregation profile"
                        placeholder='Congregation profile'
                        onChange={(e) => setCongProfile(formattLetter(e.target.value))}
                        error={!isStepValid()}
                      >
                        <MenuItem value="">
                          <em>Choose below</em>
                        </MenuItem>
                        <MenuItem value="Elder">Elder</MenuItem>
                        <MenuItem value="Ministerial servant">Ministerial servant</MenuItem>
                        <MenuItem value="Publisher">Publisher</MenuItem>
                        <MenuItem value="Unbaptize Publisher"> Unbaptize Publisher</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">Ministry Profile</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={minProfile}
                        label="Ministry Profile"
                        placeholder='Choose'
                        onChange={(e) => setMinProfile(formattLetter(e.target.value))}
                        error={!isStepValid()}
                      >
                        <MenuItem value="">
                          <em>Choose below</em>
                        </MenuItem>
                        <MenuItem value="Special pioneer">Special pioneer</MenuItem>
                        <MenuItem value="Regular pioneer">Regular pioneer</MenuItem>
                        <MenuItem value="Auxillary pioneer">Auxillary pioneer</MenuItem>
                        <MenuItem value="Publisher">Publisher</MenuItem>
                        <MenuItem value="Unbaptize publisher">Unbaptize publisher</MenuItem>
                      </Select>
                    </FormControl>
                </div>
                
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext} disabled={!isStepValid()|| passwordStrength < 100 || password !== confirmPassword}>
                {activeStep === steps.length - 1 ? 'Register' : 'Next'}
              </Button>
            </Box>
            <p className="mt-2 mb-2 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="font-bold  text-blue-500 hover:underline" 
                    >
                        Login here
                    </Link>
                </p>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
