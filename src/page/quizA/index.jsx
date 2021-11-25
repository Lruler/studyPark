import React from 'react'
import { useNavigate } from 'react-router'
import './index.css'

export default function QuizA() {
  const navigate = useNavigate()
  return (
    <div>
      我是问卷A
      <div onClick={() => navigate('/layout')} className="tostudy">提交并跳转学习平台</div>
    </div>
  )
}
