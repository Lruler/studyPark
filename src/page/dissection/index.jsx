import React from 'react'
import { useLocation } from 'react-router'
import { test } from '../quiz'
import './index.css'


export default function Dissection() {
    console.log(test)
    const location = useLocation()
    const comment = location.pathname[location.pathname.length - 1]
    return (
        <>
            {
                comment === '4' ?
                <div className='body'>
                    {
                        test.map((ques, index) => {
                            return (
                                <div key={index} className="comment">
                                    <div className="question">
                                        {ques.question}
                                    </div>
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
