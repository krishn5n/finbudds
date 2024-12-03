// SignIn.js
import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../Css/Signin.css'
import BouncingWord from '../Components/Bouncingword';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setpass] = useState('');
    const [err, disperr] = useState(false)
    const obj = document.querySelector('.input-sign.working')


    const changemail = (e) => {
        setemail(e.target.value);

    };



    const changepass = (e) => {
        setpass(e.target.value);
    };

    const submit = async () => {
        let data = { 'email': email, 'pass': password }
        let url = 'http://127.0.0.1:5000/signin'
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                localStorage.setItem('email', email)
                navigate('/home')
            }
            else {
                disperr(true)
            }
        }
        catch (err) {
            disperr(true)
            //Error has occured try again later
        }
    }

    const changecolor = (e) => {
        if (e.target) { // Add a safety check
            let arr = e.target.placeholder.split(' ')
            let url = `labels-sign ${arr[arr.length - 1].toLowerCase()}`
            let obj = document.getElementsByClassName(url)[0]
            e.target.style.borderBottom = '2px solid white'
            obj.style.color = 'white'
        } else {
            console.log('Element not found')
        }
    }

    const addcolor = (e) => {
        if (e.target) { // Add a safety check
            let arr = e.target.placeholder.split(' ')
            let url = `labels-sign ${arr[arr.length - 1].toLowerCase()}`
            let obj = document.getElementsByClassName(url)[0]
            e.target.style.borderBottom = '2px solid rgb(0, 255, 117)'
            obj.style.color = 'rgb(0, 255, 117)'
        } else {
            console.log('Element not found')
        }
    }

    const currency = [
        'Lek', '$', 'ƒ', '₼', 'Br', 'BZ$', '$b', 'KM', 'P', 'лв', 'R$', '¥', '₡', '₱', '£', 'Q', 'L', 'Ft', 'kr', '₩', 'ден', '₹',
        '₦', '₲', 'zł', '₴', '฿', '₭', '₮', '₵', '₣', '₦', '₨', 'R', '₽', 'RM', 'S$', 'Rp', '₤', '¥', '₴', '₸', '₮', 'DH', 'TL',
        'MT', 'GH₵', 'T$', '₲', '₵', '₪', 'د.ك', 'ل.س', '؋', '৳', '₫', '៛', '₹', '₣', 'руб', 'Kč', '₤', '₫', 'د.إ', 'DH', 'S/.'
    ];

    // Memoize the background elements
    const backgroundElements = useMemo(() => {
        return currency.map((ele, index) => (
            <BouncingWord word={ele} key={index} initialX={Math.random() * 1200} initialY={Math.random() * 750} />
        ));
    }, []); // Empty dependency array means this will only be created once

    return (
        <div className='fullscreen'>
            <div className="bg-full-screen">
                <div className='restof-signin'>
                    <div className="signin-overlay">
                        <div className="welcome-container">
                            <p className="heading-overlay">
                                Welcome Back!
                            </p>
                        </div>
                        <div className='singin-container'>
                            <label className='labels-sign email'>Email</label>
                            <div className='input-div'>
                                <input type='text' placeholder='Please Enter Email' className='input-sign' onFocus={addcolor} onBlur={changecolor} onChange={changemail} />
                            </div>
                            <label className='labels-sign password'>Password</label>
                            <div className='input-div'>
                                <input type='password' placeholder='Please Enter Password' className='input-sign' onFocus={addcolor} onBlur={changecolor} onChange={changepass} />
                            </div>
                            {err && <p className='errmsg'>Incorrect E-mail, username or password</p>}
                            <div className='fill-up-row put-center'>
                                <button className='green-but' onClick={submit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='full-scr'>
                    {backgroundElements}
                </div>
                <div className="blur"></div> */}
            </div>
        </div>
    );
};

export default Signin;