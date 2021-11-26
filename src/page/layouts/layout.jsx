import React, {useState, useEffect} from 'react'
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
        question: '1.可以针对图像人物的局部进行缩小、放大和变形的工具是（ ）',
        answer: ['缩放工具', '液化工具', '标尺工具', '画笔工具'],
        right: 1
    },
    {
        question: '2.液化工具的位置是（ ）',
        answer: ['图像', '图层', '滤镜', '视图'],
        right: 2
    },
    {
        question: '3.为了让花朵部分更加鲜艳，应对图像（ ）进行调整可以针对图像人物的局部进行缩小、放大和变形的工具是',
        answer: ['清晰度', '曝光', '高光', '饱和度'],
        right: 3
    },
    {
        question: '4.ps液化中（）可以直接调整人物面部细节',
        answer: ['套索工具', '人脸识别', '流量工具', '画笔'],
        right: 1
    },
    {
        question: '5.对图片加入光晕效果应该采用的滤镜是（  ）',
        answer: ['模糊', '扭曲', '像素化', '渲染'],
        right: 3
    },
    {
        question: '6.青色和（）互成补色',
        answer: ['红色', '黄色', '绿色', '蓝色'],
        right: 0
    },
    {
        question: '7.黄色和（）互成补色',
        answer: ['红色', '黄色', '绿色', '蓝色'],
        right: 3
    },
    {
        question: '8.按住（）键建立蒙板可以建立反色蒙板',
        answer: ['ctrl', 'alt', 'Q', 'E'],
        right: 1
    },
    {
        question: '9.给物体图像做倒影时应先复制图像，再（）',
        answer: ['缩放图像', '透视图像', '水平翻转图像', '垂直翻转图像'],
        right: 3
    },
    {
        question: '10.（）工具可以让物体倒影生成半透明效果',
        answer: ['图层', '文字', '反向选择', '渐变'],
        right: 1
    }]
export default function Layouts() {
    const location = useLocation()
    const opt = ['A', 'B', 'C', 'D']
    const [answer, setAnswer] = useState(Array(10).fill(0))
    const [result, setResult] = useState([])
    const [info, setInfo] = useState({ tel: '', user_name: '', group_id: 0 })
    const [start, setStart] = useState(false)
    const [isReply, setIsReply] = useState(false)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState(true)
    const [user] = useState([Math.random().toString().slice(-3), Math.random().toString().slice(-3), Math.random().toString().slice(-3), Math.random().toString().slice(-3)])
    const [reply, setReply] = useState({})
    const [getReply, setGetReply] = useState(true)
    let point = 0
    useEffect(() => {
        setInfo((preInfo) => {
            return {
                ...preInfo,
                tel: location.state.number,
                user_name: location.state.userName,
                group_id: +location.state.group
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
        let timeStr = `${29 - time.min}分钟${60 - time.sec}秒`
        let tResult = []
        for (let i = 0; i < 10; i++) {
            +answer[i][1] === test[i].right ? tResult.push(true) : tResult.push(false)
        }
        setResult(tResult)
        tResult.forEach(rlt => {
            if (rlt === true) point += 10
        });
        let postInfo = {...info, time: timeStr, point: point}
        Service.info(postInfo).then((res) => {
            alert(`提交成功！你的得分是${res.data.point}`)
        })
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
                        <Route path='quizsA' element={<QuizA handleCount={handleCount} />} />
                        <Route path='quizsB' element={<QuizB />} />
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
