import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Home.css'

const Home = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [balanceInfo, setBalanceInfo] = useState({
        amountLeft: 0,
        amountSpent: 0,
        amountSave: 0
    });
    const [loanList, setLoanList] = useState([]);
    const [modals, setModals] = useState({
        spending: false,
        amtSave: false,
        signOut: false,
        loan: false
    });
    const [newSpending, setNewSpending] = useState({
        expenseName: '',
        expenseType: 'recurring',
        amount: ''
    });
    const [newLoan, setNewLoan] = useState({
        loanName: '',
        loanAmount: '',
        loanInterest: '',
        loanTime: ''
    });

    useEffect(() => {
        if (!email) {
            navigate('/signin');
            return;
        }
        fetchBalanceInfo();
        fetchLoanList();
    }, [email, navigate]);

    const fetchBalanceInfo = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/balanceinfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setBalanceInfo({
                amountLeft: data.amountleft,
                amountSpent: data.amountspent,
                amountSave: data.amountsave
            });
        } catch (error) {
            console.error('Error fetching balance info:', error);
        }
    };

    const fetchLoanList = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/loanlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setLoanList(data.loanlist);
        } catch (error) {
            console.error('Error fetching loan list:', error);
        }
    };

    const handleAddSpending = async (e) => {
        e.preventDefault();
        try {
            const url = newSpending.expenseType === 'recurring'
                ? 'http://127.0.0.1:5000/addfixed'
                : 'http://127.0.0.1:5000/addspend';

            const data = {
                ...newSpending,
                email,
                ...(newSpending.expenseType === 'recurring' && { amounttype: 'outflow' })
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Network response was not ok');

            fetchBalanceInfo();
            setModals(prev => ({ ...prev, spending: false }));
        } catch (error) {
            console.error('Error adding spending:', error);
        }
    };

    const handleAddLoan = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/addloan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newLoan, email })
            });

            if (!response.ok) throw new Error('Network Error');

            fetchLoanList();
            setModals(prev => ({ ...prev, loan: false }));
        } catch (error) {
            console.error('Error adding loan:', error);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('email');
        navigate('/sign-in');
    };

    const renderLoanList = () => {
        const keys = ['Loan Name', 'Loan Amount', 'Loan Interest', 'Loan Time'];

        if (loanList.length === 0) {
            return <h4>No List Added</h4>;
        }

        return loanList.map((loan, index) => (
            <div key={index}>
                {keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                        <h5 style={{ display: 'inline-block' }}>{key}: </h5>
                        {loan[keyIndex + 1]} {key === 'Loan Interest' ? '%' : key === 'Loan Time' ? 'years' : ''}
                        &nbsp;&nbsp;&nbsp;
                    </React.Fragment>
                ))}
                <button
                    className="btn btn-primary"
                    style={{ marginTop: '5px' }}
                    onClick={() => {/* Implement more info modal logic */ }}
                >
                    More Information
                </button>
            </div>
        ));
    };

    return (
        <div className="container">
            <nav>
                <div style={{ display: 'flex', flexDirection: 'flexend' }}>
                    <button className="signout" onClick={() => setModals(prev => ({ ...prev, signOut: true }))}>
                        Sign-out
                    </button>
                </div>
            </nav>

            <h1>Finance Checking</h1>

            <div id="balance-checker-popup">
                <h2 style={{ color: 'white' }}>Balance Checker</h2>
                <div id="balance-check">
                    <p>Total Amount Left: <span>{balanceInfo.amountLeft}</span></p>
                    <p>Amount Spent this Month: <span>{balanceInfo.amountSpent}</span></p>
                    <p>Amount to be Saved: <span>{balanceInfo.amountSave}</span></p>
                    <button onClick={() => setModals(prev => ({ ...prev, amtSave: true }))}>
                        Update Amount-save
                    </button>
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={() => setModals(prev => ({ ...prev, spending: true }))}
                        >
                            Add a Spending
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/balanceinfo')}
                        >
                            Click For More Info
                        </button>
                    </div>
                </div>

                {/* Add Spending Modal */}
                {modals.spending && (
                    <div className="modal-overlays">
                        <div className="modal-contents">
                            <div className="heading-close">
                                <h2>Add a Spending</h2>
                                <button style={{ marginRight: '5px' }} onClick={() => setModals(prev => ({ ...prev, spending: false }))}>X</button>
                            </div>
                            <form onSubmit={handleAddSpending} className="popupinside">
                                <div>
                                    <label>Name of the Expense:</label>
                                    <input
                                        type="text"
                                        value={newSpending.expenseName}
                                        onChange={(e) => setNewSpending(prev => ({ ...prev, expenseName: e.target.value }))}
                                        required
                                        placeholder="Dine-Out"
                                    />
                                </div>
                                <div>
                                    <label>Type of Expense:</label>
                                    <select
                                        value={newSpending.expenseType}
                                        onChange={(e) => setNewSpending(prev => ({ ...prev, expenseType: e.target.value }))}
                                        className="form-select form-select-sm"
                                    >
                                        <option value="recurring">Fixed Expense</option>
                                        <option value="casual">Casual Expense</option>
                                        <option value="unexpected">Unexpected Expense</option>
                                        <option value="variable">Variable Expense</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Amount Used:</label>
                                    <input
                                        type="number"
                                        value={newSpending.amount}
                                        onChange={(e) => setNewSpending(prev => ({ ...prev, amount: e.target.value }))}
                                        required
                                        placeholder="2000"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Add Spending</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Save Amount Modal */}
                {modals.amtSave && (
                    <div className="modal-overlays">
                        <div className="modal-contents">
                            <div className="heading-close">
                                <h2>Add Your Save Amount</h2>
                                <button onClick={() => setModals(prev => ({ ...prev, amtSave: false }))}>X</button>
                            </div>
                            <div className="popupinside">
                                <input
                                    type="number"
                                    placeholder="5000"
                                    required
                                />
                                <button className="btn btn-primary">Add Saving</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sign Out Modal */}
                {modals.signOut && (
                    <div className="modal-overlays">
                        <div className="signoutcontent">
                            <div className="heading-close">
                                <h2>Sign-Out</h2>
                                <button onClick={() => setModals(prev => ({ ...prev, signOut: false }))}>X</button>
                            </div>
                            <button className="btn btn-danger" onClick={handleSignOut}>
                                Confirm Signout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="loan">
                <h2>Present Loans</h2>
                <div className="list-loans">{renderLoanList()}</div>
                <button
                    className="btn btn-primary"
                    onClick={() => setModals(prev => ({ ...prev, loan: true }))}
                >
                    Add a Loan
                </button>
            </div>

            {/* Add Loan Modal */}
            {modals.loan && (
                <div className="modal-overlays">
                    <div className="modal-contents">
                        <div className="heading-close">
                            <h2>Add a Loan</h2>
                            <button onClick={() => setModals(prev => ({ ...prev, loan: false }))}>X</button>
                        </div>
                        <form onSubmit={handleAddLoan} className="popupinside">
                            <div>
                                <label>Name of Loan:</label>
                                <input
                                    type="text"
                                    value={newLoan.loanName}
                                    onChange={(e) => setNewLoan(prev => ({ ...prev, loanName: e.target.value }))}
                                    required
                                    placeholder="College Education"
                                />
                            </div>
                            <div>
                                <label>Loan Amount:</label>
                                <input
                                    type="number"
                                    value={newLoan.loanAmount}
                                    onChange={(e) => setNewLoan(prev => ({ ...prev, loanAmount: e.target.value }))}
                                    required
                                    placeholder="10000"
                                />
                            </div>
                            <div>
                                <label>Loan Interest:</label>
                                <input
                                    type="text"
                                    value={newLoan.loanInterest}
                                    onChange={(e) => setNewLoan(prev => ({ ...prev, loanInterest: e.target.value }))}
                                    required
                                    placeholder="5.7 or 10.0"
                                />
                            </div>
                            <div>
                                <label>Time to Pay Loan:</label>
                                <input
                                    type="number"
                                    value={newLoan.loanTime}
                                    onChange={(e) => setNewLoan(prev => ({ ...prev, loanTime: e.target.value }))}
                                    required
                                    placeholder="5 (in years)"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Loan</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;