import React from 'react';
import './Register.css';
import { useEffect, useRef, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  axios  from '../../api/axios';


// global variable for regex 
const User_Regex = /^[A-z][A-z0-9-_]{3,23}$/;
const Email_Regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;  
 const Register_URL = '/register';


function Register() {

  // all variable use in register form ( information about new user )
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [Email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState('');
   const [phoneFocus, setPhoneFocus] = useState(false);

  const [country, setCountry] = useState('');
   const [countryFocus, setCountryFocus] = useState(false);

  const [city, setCity] = useState('');
   const [cityFocus, setCityFocus] = useState(false);

  const [jobTitle, setJobTitle] = useState('');
  const [jopTitleFocus, setJopTitleFocus] = useState(false);


  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

    const [gender, setGender] = useState({
      male : false , female : false
    });
      // gender function 
  const handleGender = (e)=>{
   const{name} = e.target;
   console.log('clicked', name);

   if(name === 'male'){
    setGender({male : true , female: false})
   }
   if(name === 'female'){
    setGender({male:false, female : true})
   }
    

  }

// all function 
  useEffect(() => {
        userRef.current.focus();
    }, []);

  useEffect(() => {
        setValidName(User_Regex.test(user));
    }, [user]);

  useEffect(() => {
        setValidEmail(Email_Regex.test(Email));
    }, [Email]);

  useEffect(() => {
        setValidPwd(PWD_Regex.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);
    
  useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, Email]);


  

    // submit function 
  const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = User_Regex.test(user);
        const v2 = PWD_Regex.test(pwd);
        const v3 = Email_Regex.test(Email);
        if (!v1 || !v2 || v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(Register_URL,
                JSON.stringify({ user, pwd , Email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setEmail('');
            setPhone('');
            setCountry('');
            setCity('');
            setJobTitle('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

  

  return (
    <div>
       <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register form </h1>
                    <form onSubmit={handleSubmit}>

                      {/* user name  */}
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        {/* user Email  */}
                        <label htmlFor="Email" >
                          Email: 
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !Email ? "hide" : "invalid"} />
                        </label>

                           <input
                            type="Email"
                            id="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={Email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="Emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />

                        {/* user country  */}
                        <label htmlFor="country" >
                          country 
                        </label>
                        <input
                            type="text"
                            id="country"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            required
                            onFocus={() => setCountryFocus(true)}
                            onBlur={() => setCountryFocus(false)}
                        />

                        {/* user city  */}
                         <label htmlFor="city" >
                          city: 
                        </label>
                        <input
                            type="text"
                            id="city"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            required
                            onFocus={() => setCityFocus(true)}
                            onBlur={() => setCityFocus(false)}
                        />

                        {/* user phone number  */}
                         <label htmlFor="phone" >
                          phone: 
                        </label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />

                        {/* user jop title  */}
                         <label htmlFor="jopTitle" >
                          jop title: 
                        </label>
                        <input
                            type="text"
                            id="jopTitle"
                            onChange={(e) => setJobTitle(e.target.value)}
                            value={jobTitle}
                            required
                            onFocus={() => setJopTitleFocus(true)}
                            onBlur={() => setJopTitleFocus(false)}
                        />
                        {/* user gender  */}
                        <span> Male </span>
                        <input
                          name='male'
                          type = "radio"
                          value = "Male"
                          color = "primary"
                          onChange = {handleGender}
                          checked = {gender.male}
                        />
                        <span> Female </span>
                        <input
                          name='female'
                          type = "radio"
                          value = "Female"
                          color = "primary"
                          onChange = {handleGender}
                          checked = {gender.female}
                          />
                          
                       

                        {/* user password  */}
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        {/* user confirm password */}
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        {/* user button  */}
                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    </div>

  )
}

export default Register