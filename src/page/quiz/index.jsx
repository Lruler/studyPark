import React, { useState, useEffect } from 'react'
import './index.css'
import Questions from '../../components/question'

export default function Quiz(props) {
  const {result ,handleSubmit} = props
  const [start, setStart] = useState(false)
  const [clause, setClause] = useState(false)
  const [count, setCount] = useState({ min: 29, sec: 59 })
  const [time, setTime] = useState(true)
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
      setStart(true)
    }
  }
  const handleClause = () => {
    setClause(!clause)
  }
  const handleToSubmit = () => {
    handleSubmit()
    setTime(false)
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
            <div className={time ? 'submit' : 'no-submit'} onClick={time ? handleToSubmit : null}>
              提交测试
            </div>
          </div> :
          <div className="start">
            <div className="text">
              <h2>平台测试题</h2>
              <div className="tip">
                <p>1.仅可答题一次！请认真仔细阅题！</p>
                <p>2.测验限时30分钟</p>
                <p>3.题型为选择题 且都是单选题</p>
              </div>
              <div className="clause">
                <input type="checkbox" name="clause" onChange={handleClause} checked={clause} />
                依照学术诚信条款，我保证本测验答案是我独立完成的
              </div>
              <div onClick={handleStart} className={clause ? 'button' : 'forbid'}>
                开始测验
              </div>
            </div>
          </div>
      }
    </>
  )
}
