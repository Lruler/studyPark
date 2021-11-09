import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layouts from './layouts/layout'
import Landing from './landing'

export default function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/layout/*' element={<Layouts />} />
            </Routes>
        </Router>
    )
}
