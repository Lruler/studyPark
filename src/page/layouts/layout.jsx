import React, {useState} from 'react'
import { Route, Routes } from 'react-router'
import PubSub from 'pubsub-js'
import Layout from './index'
import Dissection from '../dissection'
import Quiz from '../quiz'
import Teach from '../teach' 
    

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
    const opt = ['A', 'B', 'C', 'D']
    const [answer, setAnswer] = useState(Array(10).fill(0))
    const [result, setResult] = useState([])
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
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path='/' element={<Teach />} />
                    <Route path='quiz' element={<Quiz
                        opt={opt}
                        answer={answer}
                        result={result}
                        handleAnswer={handleAnswer}
                        handleSubmit={handleSubmit}
                        test={test} />} />
                    <Route path='dissection/:count' element={<Dissection
                        opt={opt}
                        answer={answer}
                        result={result}
                        handleAnswer={handleAnswer}
                        handleSubmit={handleSubmit}
                        test={test}  />} />
                </Routes>
            </Layout>
        </div>
    )
}
