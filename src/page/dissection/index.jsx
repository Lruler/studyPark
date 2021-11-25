/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.css'
import Questions from '../../components/question'
import { LikeTwoTone, DislikeTwoTone } from '@ant-design/icons'


export default function Dissection(props) {
    const { user, reply, getReply } = props
    const [like, setLike] = useState(Array(4).fill(false))
    const [disLike, setDisLike] = useState(Array(4).fill(false))

    const navagate = useNavigate()

    let qesNum = Object.keys(reply)
    const handleLike = (key) => {
        let newLike = like.map((like, index) => {
            if (index === key) return !like
            else return like
        })
        let newDisLike = disLike[key] ? disLike.map((dislike, index) => {
            if (index === key) return false
            else return dislike
        }) : disLike
        setLike(newLike)
        setDisLike(newDisLike)
    }
    const handleDisLike = (key) => {
        let newDisLike = disLike.map((dislike, index) => {
            if (index === key) return !dislike
            else return dislike
        })
        let newLike = like[key] ? like.map((like, index) => {
            if (index === key) return false
            else return like
        }) : like
        setDisLike(newDisLike)
        setLike(newLike)
    }
    const newTest = props.test.filter((_, index) => {
        return qesNum.includes(`${index + 1}`)
    })
    const newAnswer = props.answer.filter((_, index) => {
        return qesNum.includes(`${index + 1}`)
    })
    const location = useLocation()
    const comment = location.pathname[location.pathname.length - 1]
    if (comment === '4' && getReply) {
        props.handleReply()
    }
    return (
        <>
            {
                props.isReply ?
                    <div className='body'>
                    {
                        newTest.map((_, index) => {
                        let replyTest = []
                        let replyAnswer = []
                        replyAnswer.push(newAnswer[index])
                        replyTest.push(newTest[index])
                        let replyComment = []
                        for (const ques in reply) {
                            replyComment.push({ques: reply[ques]})
                        }
                        return (
                            <div className='message' key={index}>
                                <div className="comment">
                                    <div className="question">
                                        <Questions {...props} answer={replyAnswer} test={replyTest} />
                                    </div>
                                </div>
                                <div className="reply">
                                    <b>共 1 条回复：</b>
                                    <div className="hr"></div>
                                    <div className="reply-detail">
                                        <Avatar shape="circle" icon={<UserOutlined />} />
                                        <b>用户名{user[index]}:</b>
                                        <br />
                                        <div className="detail">
                                            {replyComment[index].ques}
                                        </div>
                                        <div className="interaction">
                                            <LikeTwoTone
                                                onClick={() => handleLike(index)}
                                                className='likeicon'
                                                twoToneColor={like[index] ? 'red' : 'gray'}
                                            />
                                            <DislikeTwoTone
                                                onClick={() => handleDisLike(index)}
                                                className='likeicon'
                                                twoToneColor={disLike[index] ? 'black' : 'gray'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="hr"></div>
                            </div>
                            )
                        })
                    }
                     <div className="quizB" onClick={() => navagate('/layout/quizsB')}>跳转问卷B</div>
                </div> :
                    <div>
                    别心急～暂时还没人回复你哦
                </div>
            }
        </>
    )
}
