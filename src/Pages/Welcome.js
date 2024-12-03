import React from "react";
import "../Css/Welcome.css"
import TopHeading from "../Components/TopHeading";
import BouncingWord from '../Components/Bouncingword';
import { useNavigate } from "react-router-dom";

export default function Welcome(props) {
    const currency = [
        'Lek', '$', 'ƒ', '₼', 'Br', 'BZ$', '$b', 'KM', 'P', 'лв', 'R$', '¥', '₡', '₱', '£', 'Q', 'L', 'Ft', 'kr', '₩', 'ден', '₹',
        '₦', '₲', 'zł', '₴', '฿', '₭', '₮', '₵', '₣', '₦', '₨', 'R', '₽', 'RM', 'S$', 'Rp', '₤', '¥', '₴', '₸', '₮', 'DH', 'TL',
        'MT', 'GH₵', 'T$', '₲', '₵', '₪', 'د.ك', 'ل.س', '؋', '৳', '₫', '៛', '₹', '₣', 'руб', 'Kč', '₤', '₫', 'د.إ', 'DH', 'S/.'
    ];
    const navigate = useNavigate();
    const gotosignin = () => {
        navigate('/signin')
    }
    const gotosignup = () => {
        navigate('/signup')
    }
    return (
        <div className='fullscreen'>
            <div className="bg-full-screen">
                <div className="welcome-centered-overlay">
                    <div className="overlay">
                        <div className="welcome-container">
                            <p className="heading-overlay">
                                FinBuddy
                            </p>
                        </div>
                        <div className="welcome-container">
                            <p className="quote-welcome">
                                Finance at the palm of your hand
                            </p>
                        </div>
                        <div className="sign-but-cont-welcome">
                            <button onClick={gotosignin} className="sign-in-buttom-welcome green-but">
                                Sign-In
                            </button>
                            <button className="sign-up-buttom-welcome green-but" onClick={gotosignup}>
                                Sign-Up
                            </button>
                        </div>
                    </div>
                </div>
                {
                    currency.map((ele) => (
                        <BouncingWord word={ele} key={Math.random()} />
                    ))
                }
            </div>
        </div>
    )
}