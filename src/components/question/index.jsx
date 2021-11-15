import React from 'react'
import './index.css'

export default function Questions(props) {
    const { test, opt, answer, result, handleAnswer } = props
    return (
        <div className="questions">
            {
                test.map((e, index) => {
                    return (
                        <div key={e.question} >
                            <div className="question">{e.question}</div>
                            <div className="answer">
                                {e.answer.map((a, as) => {
                                    let n 
                                    let res
                                    if (answer.length === 10) {
                                        n = index + '' + as
                                        res = answer[index] === n && result.length === 10 ?
                                            result[index] === true ? 'right' : 'error' : ''
                                    }
                                    else {
                                        n = index + '' + as
                                        res = +answer[0][1] === as ? result[+answer[0][0]] ? 'right' : 'error' : ''
                                    }
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
                                        本道题的正确答案是{opt[e.right]}，您的答案是{opt[+answer[index][1]]}
                                    </div> : null
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
