import React from 'react'
import { useLocation } from 'react-router'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.css'
import Questions from '../../components/question'


export default function Dissection(props) {
    const newTest = props.test.filter((_, index) => {
        return index === 3 || index === 7
    })
    const location = useLocation()
    const comment = location.pathname[location.pathname.length - 1]
    return (
        <>
            {
                comment === '4' ?
                <div className='body'>
                    {
                        newTest.map((_, index) => {
                            let replyTest = []
                            replyTest.push(newTest[index])
                            return (
                                <div key={index}>
                                    <div className="comment">
                                        <div className="question">
                                            <Questions {...props} test={replyTest} />
                                        </div>
                                    </div>
                                    <div className="reply">
                                        <b>共 1 条回复：</b>
                                        <div className="hr"></div>
                                        <div className="reply-detail">
                                            <Avatar shape="circle" icon={<UserOutlined />} />
                                            <b>用户名xxxxxx:</b>
                                            <br />
                                            回复内容xxxxx
                                        </div>
                                    </div>
                                    <div className="hr"></div>
                                </div>
                            )
                        })
                    }
                </div> :
                <div>
                    别心急～暂时还没人回复你哦
                </div>
            }
        </>
    )
}
