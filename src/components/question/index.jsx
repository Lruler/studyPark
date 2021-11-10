import React from 'react'

export default function Questions(props) {
    const { test, opt, answer, result, handleAnswer } = props
    return (
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
    )
}
