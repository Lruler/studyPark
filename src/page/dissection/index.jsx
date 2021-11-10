import React from 'react'
import { useLocation } from 'react-router'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { test } from '../layouts/layout'
import './index.css'
import Questions from '../../components/question'


export default function Dissection(props) {
    // const c = [3, 4, 5, 6]
    const newTest = props.test.filter((_, index) => {
        if (index === 3 || 4 || 5 || 6)
            return true
        return false
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
                            return (
                                <div key={index}>
                                    <div className="comment">
                                        <div className="question">
                                            <Questions {...props} test={newTest} />
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
