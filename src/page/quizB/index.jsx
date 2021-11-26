import React from 'react'
import { useNavigate } from 'react-router'
import './index.css'

export default function QuizB() {
    const navigate = useNavigate()
    const handleToEnd = () => {
        navigate('/layout/quizsend')
    }
    return (
        <div>
            我是B
            <div onClick={handleToEnd} className="tostudy">提交</div>
        </div>
    )
}
