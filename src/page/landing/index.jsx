import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Service from '../../common/service'
import './index.css'

export default function Landing() {
  const navigate = useNavigate()
  const [group, setGroup] = useState('')
  const [number, setNumber] = useState('')
  const [userName, setUserName] = useState('')
  const handleGroup = (e) => {
    setGroup(e.target.value)
  }
  const handleNumber = (e) => {
    setNumber(e.target.value)
  }
  const handleEntring = () => {
    if (typeof +group !== 'number' || +group < 1 || +group > 4) alert('请输入正确的组别！') //应该写正则来着
    else if (group !== '' && number === '') alert('请输入联系方式！')
    else {
      navigate('/layout', {replace: true, state: {group, number, userName}})
    }
  }
  useEffect(() => {
    Service.rand().then((res) => {
      setUserName(res.data)
    })
  }, [])
  return (
    <>
    <div className='bcimg'>
      {/* <div className="entring"></div> */}
      <div className="entring-msg">
        <div className='title'>欢迎来到乐学中心</div>
        <b>这是一个线上学习互助交流平台， 祝您学习愉快！</b>
        <br />
          <div className="entring-input">
            <label className='landinglabel' htmlFor="user">
              <span className='la-span'>用户名</span>
              <input onChange={handleGroup} value={`${userName}`} type="text" readOnly />
            </label>
            <label className='landinglabel' htmlFor="group">
              <span className='la-span'>学习组</span>
              <input onChange={handleGroup} value={group} type="text" />
          </label>
            <label className='landinglabel' htmlFor="number">
              <span className='la-span'>性别</span>
              <input onChange={handleNumber} value={number} type="text" />
          </label>
        </div>
        </div>
        <div onClick={handleEntring} className="entring-button">
          进入
        </div>
      </div>
    </>
  )
}
