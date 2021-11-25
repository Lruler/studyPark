import React from 'react'
import { useNavigate } from 'react-router'
import './index.css'

export default function QuizA(props) {
  const navigate = useNavigate()
  const handleToA = () => {
    navigate('/layout/quiz')
    props.handleCount()
  }
  return (
    <div>
      我是问卷A
      <div onClick={handleToA} className="tostudy">提交并跳转学习平台</div>
    </div>
  )
}
