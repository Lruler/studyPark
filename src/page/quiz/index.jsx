import React, { useState, useEffect } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default function Quiz() {
  const test = [
    {
      question: '可以针对图像人物的局部进行缩小、放大和变形的工具是（ ）',
      answer: ['缩放工具', '液化工具', '标尺工具', '画笔工具'],
      right: 1
    },
    {
      question: '液化工具的位置是（ ）',
      answer: ['图像', '图层', '滤镜', '视图'],
      right: 2
    },
    {
      question: '为了让花朵部分更加鲜艳，应对图像（ ）进行调整可以针对图像人物的局部进行缩小、放大和变形的工具是',
      answer: ['清晰度', '曝光', '高光', '饱和度'],
      right: 3
    },
    {
      question: 'ps液化中（）可以直接调整人物面部细节',
      answer: ['套索工具', '人脸识别', '流量工具', '画笔'],
      right: 1
    },
    {
      question: '对图片加入光晕效果应该采用的滤镜是（  ）',
      answer: ['模糊', '扭曲', '像素化', '渲染'],
      right: 3
    },
    {
      question: '青色和（）互成补色',
      answer: ['红色', '黄色', '绿色', '蓝色'],
      right: 0
    },
    {
      question: '黄色和（）互成补色',
      answer: ['红色', '黄色', '绿色', '蓝色'],
      right: 3
    },
    {
      question: '按住（）键建立蒙板可以建立反色蒙板',
      answer: ['ctrl', 'alt', 'Q', 'E'],
      right: 1
    },
    {
      question: '给物体图像做倒影时应先复制图像，再（）',
      answer: ['缩放图像', '透视图像', '水平翻转图像', '垂直翻转图像'],
      right: 3
    },
    {
      question: '（）工具可以让物体倒影生成半透明效果',
      answer: ['图层', '文字', '反向选择', '渐变'],
      right: 1
    }]
  const opt = ['A', 'B', 'C', 'D']
  const [start, setStart] = useState(false)
  const [clause, setClause] = useState(false)
  const [answer, setAnswer] = useState(Array(10).fill(0))
  const [result, setResult] = useState([])
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
  const handleAnswer = (e) => {
    let newAnswer = answer
    newAnswer[+e.target.value[0]] = e.target.value
    setAnswer(newAnswer)
  }
  const handleSubmit = () => {
    if (answer.includes(0)) {
      alert('请完成所有题目！')
      return
    }
    setTime(false)
    let tResult = []
    for (let i = 0; i < 10; i++) {
      +answer[i][1] === test[i].right ? tResult.push(true) : tResult.push(false)
    }
    setResult(tResult)
    PubSub.publish('msg', 4)
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    })
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
            <div className="questions">
              {
                test.map((e, index) => {
                  let num = index + 1
                  return (
                    <div key={e.question} >
                      <div className="question">{num + '.' + e.question}</div>
                      <div className="answer">
                        {e.answer.map((a, as) => {
                          const n = index + '' + as
                          const res = answer[index] === n && result.length === 10 ?
                            result[index] === true ? 'right' : 'error' : ''
                          return (
                            <label key={n} htmlFor={n}>
                              <div className={'radio ' + res} style={{
                                pointerEvents: result.length === 10 ? 'none' : 'auto'
                              }}>{opt[as]}.
                                <input
                                  value={n}
                                  onChange={handleAnswer}
                                  type="radio"
                                  name={index}
                                  disabled={result.length === 10 ? true : false}
                                  id={n} />{a}
                              </div>
                            </label>
                          )
                        })}
                        {
                          result.length === 10 ? <div className="result">
                            本道题的正确答案是{opt[e.right]}，您的答案是{opt[+answer[index][1]]}，{result[index] ? '恭喜您！答对了' : '很遗憾，仔细一点没准就能对哦'}
                          </div> : null
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={time ? 'submit' : 'no-submit'} onClick={time ? handleSubmit : null}>
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
