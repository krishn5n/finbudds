import React from "react";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    )
}