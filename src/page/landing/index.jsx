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
    if (group === '') alert('请输入组别！')
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
    <div className='bcimg'>
      <div className="entring"></div>
      <div className="entring-msg">
        <h1>欢迎来到乐学中心</h1>
        <b>这是一个线上学习互助交流平台， 祝您学习愉快！</b>
        <br />
        <b>您的用户名为: 用户:{userName}</b>
        <div className="entring-input">
          <label htmlFor="group">
            请填写你所属的学习组: <input onChange={handleGroup} value={group} type="text" />
          </label>
          <label htmlFor="number">
            请填写您的联系方式: <input onChange={handleNumber} value={number} type="text" />
          </label>
        </div>
        <div className="tip">
          <p>【联系方式仅用于发放被试费，请优先填写与支付宝绑定的电话号码，若未绑定支付宝,</p>
          <p>则填写QQ号/微信号/电话号码/其他联系方式，填写格式为:支付宝xxxxxxx】</p>
        </div>
        <div onClick={handleEntring} className="entring-button">
            进入
        </div>
      </div>
    </div>
  )
}
