import React, { useState } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import '../Css/Signup.css'
import '../Css/Signin.css'

import BouncingWord from "../Components/Bouncingword";

export default function Signup() {
    const navigate = useNavigate();
    const [mail, setmail] = useState('');
    const [pass, setpass] = useState('');
    const [name, setname] = useState('');
    const [num, setnum] = useState('');
    const [age, setage] = useState('');
    const [valid, setvalid] = useState([false, false])

    const emailcheck = /^[A-Za-z0-9]+@(gmail|yahoo|bing|hotmail)\.(com|in|us)$/
    const passwdcheck = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+[{}|;:'",.<>?]).*$/


    const changemail = (e) => {
        setmail(e.target.value)
        if (emailcheck.test(mail)) {
            let prevvalid = valid
            prevvalid[0] = true
            setvalid(prevvalid)
        }
    }

    const changepass = (e) => {
        setpass(e.target.value)
        if (passwdcheck.test(pass)) {
            let prevvalid = valid
            prevvalid[1] = true
            setvalid(prevvalid)
        }
    }

    const changename = (e) => {
        setname(e.target.value)
    }

    const changenum = (e) => {
        setnum(e.target.value)
    }

    const changeage = (e) => {
        setage(e.target.value)
    }

    const submit = async () => {
        try {
            if (valid[0] && valid[1]) {
                let data = { "name": name, "phone": num, "age": age, "email": mail, "pass": pass, "usage": "personal" }
                let url = 'http://127.0.0.1:5000/signup'
                let resp = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                if (resp.status === 200) {
                    localStorage.setItem('email', mail)
                    navigate('/home')
                }
            }
            else {
                //Show alert screen to display
            }
        }
        catch (err) {
            //Show an alert screen
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
    }, [currency]); // Empty dependency array means this will only be created once

    return (
        <div className='fullscreen'>
            <div className="bg-full-screen">
                <div className="rest-of-signup">
                    <div className="signup-overlay">
                        <label className='labels-sign name'>Name</label>
                        <div className='input-div'>
                            <input type='text' placeholder="Enter Name" onFocus={addcolor} onBlur={changecolor} className='input-sign' onChange={changename} />
                        </div>
                        <label className='labels-sign mail'>Email</label>
                        <div className='input-div'>
                            <input type='text' onFocus={addcolor} placeholder="Enter Mail" onBlur={changecolor} className='input-sign' onChange={changemail} />
                        </div>
                        <div>
                            <label className='labels-sign phone-number inline'>Phone-Number</label>
                            <label className='labels-sign age inline'>Age</label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', width: '50vw', justifyContent: 'center' }}>
                            <input type='number' placeholder="Enter Phone-Number" onFocus={addcolor} onBlur={changecolor} className='input-sign phone' onChange={changenum} />
                            <input type='Number' placeholder="Enter age" onFocus={addcolor} onBlur={changecolor} className='input-sign age' onChange={changeage} />
                        </div>
                        <label className='labels-sign password'>Password</label>
                        <div className='input-div'>
                            <input type='password' placeholder="Enter Password" onFocus={addcolor} onBlur={changecolor} className='input-sign' onChange={changepass} />
                        </div>
                        <div className='fill-up-row put-center'>
                            <button className='green-but' onClick={submit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden next-to-email">
                    Please enter a valid E-mail
                </div>
                <div className='full-scr'>
                    {backgroundElements}
                </div>
                <div className="blur"></div>
            </div>
        </div>
    )
}