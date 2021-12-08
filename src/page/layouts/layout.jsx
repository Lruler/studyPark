import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Layout from './index'
import Dissection from '../dissection'
import Quiz from '../quiz'
import Teach from '../teach'
import Service from '../../common/service'
import QuizA from '../quizA'
import QuizB from '../quizB'
import End from '../end'


export const test = [
    {
        question: '1.代表“赛博朋克”风格的色彩是（ ）',
        answer: ['亮粉色和亮蓝色', '亮粉色和深蓝色', '深粉色和亮蓝色', '深粉色和深蓝色'],
        right: 2
    },
    {
        question: '2.如何操作可以使后续对图层的编辑都是非破坏性的，可随时撤销以及修改配置（ ）',
        answer: ['复制图层', '备份图层', '打开图层', '保存图层'],
        right: 1
    },
    {
        question: '3.来到滤镜菜单，选择（ ），有很多调整项，能够让你的照片具备伪HDR效果',
        answer: ['cameraraw 滤镜', '滤镜库', '液化镜头', '广角'],
        right: 0
    },
    {
        question: '4.（	）滑块能够很好的将主色调调整为赛博朋克色彩',
        answer: ['色温和对比度', '色温和饱和度', '色温和色调', '色温和高光'],
        right: 2
    },
    {
        question: '5.大幅调（ ）“高光”值，调（	 ）“阴影”值，能够将更多细节带出，让照片更具备HDR效果',
        answer: ['低  低', '低	高', '高  低', '高  高'],
        right: 1
    },
    {
        question: '6.降低“高光”会同时让灯光亮度减弱，所以适当提高“（  ）”提升灯光亮度',
        answer: ['阴影', '白色', '黑色', '曝光'],
        right: 1
    },
    {
        question: '7.对细节丰富的照片，或许你会提高“清晰度”值，但降低到（  ）反而对营造灯光效果更有效',
        answer: ['-12到-10', '-10到-8', '-8到-6', '-6到-4'],
        right: 1
    },
    {
        question: '8.为了弥补因为调整“高光”“阴影”造成的对比度损失，可以调整（ ）',
        answer: ['清晰度', '自然饱和度', '去除薄雾', '饱和度'],
        right: 2
    },
    {
        question: '9.在菜单项顶部，选择“（  ）”，调整它能够继续强化“粉蓝”色调',
        answer: ['色调曲线', 'HSL调整', '效果', '分离色调'],
        right: 3
    },
    {
        question: '10.（）工具可以让物体倒影生成半透明效果',
        answer: ['画笔', '油漆桶', '模糊工具', '减淡工具'],
        right: 0
    }]
export default function Layouts() {
    const location = useLocation()
    const opt = ['A', 'B', 'C', 'D']
    const [answer, setAnswer] = useState(Array(10).fill(0))
    const [result, setResult] = useState([])
    const [info, setInfo] = useState({ sex: '男', user_name: '111', group_id: 0 })
    const [start, setStart] = useState(false)
    const [isReply, setIsReply] = useState(false)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState(true)
    const [user] = useState([Math.random().toString().slice(-3), Math.random().toString().slice(-3), Math.random().toString().slice(-3), Math.random().toString().slice(-3)])
    const [reply, setReply] = useState({})
    const [getReply, setGetReply] = useState(true)
    let point = 0
    let timeStr = ''
    useEffect(() => {
        setInfo((preInfo) => {
            return {
                ...preInfo,
                sex: location.state?.number,
                user_name: location.state?.userName,
                group_id: +location.state?.group
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleAnswer = (e) => {
        let newAnswer = answer
        newAnswer[+e.target.value[0]] = e.target.value
        setAnswer(newAnswer)
    }
    const handleSubmit = (time) => {
        if (answer.includes(0)) {
            alert('请完成所有题目！')
            return false
        }
        timeStr = `${29 - time.min}分钟${60 - time.sec}秒`
        let tResult = []
        for (let i = 0; i < 10; i++) {
            +answer[i][1] === test[i].right ? tResult.push(true) : tResult.push(false)
        }
        setResult(tResult)
        tResult.forEach(rlt => {
            if (rlt === true) point += 10
        });
        setInfo((preInfo) => ({
            ...preInfo,
            point,
            timeStr
        }))
        alert(`提交成功！你的得分是${point},用时${timeStr}`)
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        })
        return true
    }
    const handleStart = () => {
        setStart(true)
    }
    const handleReply = () => {
        setIsReply(true)
        let postRlt = result.map((rlt) => {
            if (rlt === true) return 1
            else return 0
        })
        Service.message(postRlt, info.group_id).then((res) => {
            setReply(res.data)
        })
        setGetReply(false)
    }
    const handleTime = () => {
        setTime(false)
    }
    const handleCount = () => {
        setCount(4)
    }
    return (
        <div>
            {
                location.pathname.includes('quizs') ?
                    <Routes>
                        <Route path='quizsend' element={<End />} />
                        <Route
                            path='quizsA'
                            element={<QuizA
                                handleCount={handleCount}
                                info={info}
                            />} />
                        <Route path='quizsB' element={<QuizB info={info} />} />
                    </Routes>
                    :
                    <Layout count={count}>
                        <Routes>
                            <Route path='home' element={<Teach />} />
                            <Route path='quiz' element={<Quiz
                                opt={opt}
                                answer={answer}
                                result={result}
                                time={time}
                                handleTime={handleTime}
                                handleAnswer={handleAnswer}
                                handleSubmit={handleSubmit}
                                handleStart={handleStart}
                                start={start}
                                test={test} />} />
                            <Route path='dissection/:count' element={<Dissection
                                opt={opt}
                                group_id={info.group_id}
                                answer={answer}
                                result={result}
                                isReply={isReply}
                                count={count}
                                user={user}
                                reply={reply}
                                getReply={getReply}
                                handleAnswer={handleAnswer}
                                handleSubmit={handleSubmit}
                                handleReply={handleReply}
                                test={test} />} />
                            <Route path='/' element={<Navigate to='home' />} />
                        </Routes>
                    </Layout>
            }
        </div>
    )
}
