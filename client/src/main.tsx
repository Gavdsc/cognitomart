import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/Index.module.scss'
import { RouterProvider } from "react-router-dom";
import Router from "@/Router"; 

// Import root fonts from Fontsource
import '@fontsource-variable/nunito';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>,
)