import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from './index'
import Dissection from '../dissection'
import Quiz from '../quiz'
import Teach from '../teach' 
    
export default function Layouts() {
    
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path='/' element={<Teach />} />
                    <Route path='quiz' element={<Quiz />} />
                    <Route path='dissection/:count' element={<Dissection />} />
                </Routes>
            </Layout>
        </div>
    )
}
