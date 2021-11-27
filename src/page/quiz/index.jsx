import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './index.css'
import Questions from '../../components/question'

export default function Quiz(props) {
  const {result, handleSubmit, start, time, handleTime} = props
  const [clause, setClause] = useState(false)
  const [count, setCount] = useState({ min: 29, sec: 59 })
  const navigate = useNavigate()
  useEffect(() => {
    const newTimer = setTimeout(() => {
      if (start && time) {
        if (result.length === 10) {
            clearInterval(newTimer)
        }
        if (count.sec >= 0) {
          if (count.sec === 1) {
            setCount((c) => {
              return {min: c.min, sec: c.sec -1}
            })
          }
          else if (count.sec === 0) {
            setCount((c) => {
              return {min: c.min - 1, sec: 59}
            })
          }
          else {
            setCount((c) => {
              return {min: c.min, sec: c.sec - 1}
            })
          }
        }
      }
      return () => clearInterval(newTimer);
    }, 1000)
  }, [count, result.length, start, time])
  const handleStart = () => {
    if (clause) {
      props.handleStart()
    }
  }
  const handleClause = () => {
    setClause(!clause)
  }
  const handleToSubmit = () => {
    let a =  true
     a = handleSubmit(count)
    if (a) handleTime()
  }
  let format = count.sec < 10 ? '0' + count.sec : count.sec
  return (
    <>
      {
          start?
          <div className='test'>
            <div className="timer">
              {count.min + ':' + format}
            </div>
            <b>平台测试题</b>
            <Questions {...props} />
            {
              time ?
                <div className='submit' onClick={handleToSubmit}>
                  提交测试
                </div> :
                <div className='submit' onClick={() => navigate('/layout/quizsA')}>
                  跳转问卷A
                </div>
            }

          </div> :
          <div className="start">
            <div className="text">
              <h2>平台测试题</h2>
              <div className='i'>
                <div>1.仅可答题一次！请认真仔细阅题！</div>
                <div>2.测验限时30分钟</div>
                <div>3.题型为选择题 且都是单选题</div>
              </div>
              <div className="clause">
                <input type="checkbox" name="clause" onChange={handleClause} checked={clause} />
                依照学术诚信条款，我保证本测验答案是我独立完成的
              </div>
              <div onClick={handleStart} className={clause ? 'button-quiz' : 'forbid'}>
                开始测验
              </div>
            </div>
          </div>
      }
    </>
  )
}
