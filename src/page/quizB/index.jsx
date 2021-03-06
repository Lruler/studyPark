import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Service from "../../common/service";
import "./index.css";

export default function QuizA(props) {
  const navigate = useNavigate();
  const quizAs1 = [
    " 1. 我觉得学习是一件很快乐的事情。",
    " 2. 学习使我产生一种沮丧感。",
    " 3. 我会因为在网课中表现好而感到自豪。",
    " 4. 我很担心在测验中做不完题目。",
    " 5. 我对学习充满热情。",
    " 6. 老师照本宣科，所讲知识落伍让我很生气。",
    " 7. 我能平静的应对测试。",
    " 8. 学有所获，我很有成就感。",
    " 9. 我对学习不感兴趣。",
    "10. 我觉得每天学到新知识很愉快。",
    "11. 由于没有认真学习我感到羞愧。",
    "12. 我觉得学习枯燥乏味。",
    "13. 我能轻松自如地应对学习。",
    "14. 我很担心考不好。",
    "15. 在学习上，我没感觉到什么压力。",
    "16. 由于在学习中犯低级错误我羞愧不已。",
    "17. 按要求完成学习任务后，我感到很自豪。",
    "18. 我觉得很多课程远离生活，没有实用价值。",
    "19. 我很高兴能利用业余时间扩充知识，开阔眼界。",
    "20. 测验题目简单，但自己做错了，我觉得很丢脸。",
    "21. 独立分析解决了问题，我会很有成就感。",
    "22. 我对学习感到力不从心。",
    "23. 我觉得老师上课索然无味。",
    "24. 我不主动学习。",
    "25. 一想到学习我就无精打采。",
    "26. 我完成测验的时候心情很放松。",
    "27. 尽管我学习很努力，但成绩依然不理想。",
    "28. 由于取得了好成绩，我感到自豪。",
    "29. 我会因为很长时间想不明白一个问题而很气恼。",
    "30. 在安静环境里学习，我感到很平静。",
    "31. 现在的学习使我无法冷静处理一些情绪上的问题。",
    "32. 我喜欢学习。",
    "33. 在测验中遇到不会做的题目，我会很紧张。",
    "34. 学习效率高是一件我引以为傲的事情。",
    "35. 由于浪费了时间我感到羞愧。",
    "36. 我对学习有一种倦怠感。",
    "37. 我不为我的学习担忧。",
    "38. 我觉得测验与能力无关，毫无意义。",
    "39. 网课学习中，我能跟上老师的进度并产生共鸣。",
    "40. 学习时，我容易心烦意乱。",
    "41. 由于克服了学习中的困难，我为自己感到自豪。",
    "42. 测验前我会紧张不安。",
    "43. 我讨厌学习。",
    "44. 我能心平气和的对待学习任务。",
  ];
  const quizAs2 = [
    "1. 我不能准确明白视频内容表达的意思。",
    "2. 我觉得自己具有解决网络学习中遇到问题的能力。",
    "3. 我认为自己看视频时总是开小差以至于不能认真听讲。",
    "4. 我总能够找出视频中的重点进行网络学习。",
    "5. 不管测验成绩好坏，我从不怀疑自己的学习能力。",
    "6. 我具有向富有挑战性的学习任务发起挑战的能力。",
    "7. 我觉得自己的学习能力很强。",
    "8. 我有能力在网课中掌握老师所教授的知识。",
    "9. 面对不理想的成绩我也能平静地分析错误原因。",
    "10. 我认为自己有能力通过网络学习取得好成绩。",
    "11. 我可以将现在所学内容与实际生活结合起来思考问题。",
    "12. 在日常学习中，我选择那些较难的学习任务进行学习。",
    "13. 我可以将本次视频学习中所学到的知识联系起来思考。",
    "14. 完成测验时我总能记起老师讲过的每一个细节。",
    "15. 我觉得我可以学以致用。",
    "16、无论何时，我能够根据自己的实际情况制定学习目标、安排时间。",
  ];
  const quizB = [
    "你觉得评论你的人更成人化还是更低龄化？",
    "你认为评论者的助人程度如何？",
    "你认为评论者的友好程度如何？",
    "你认为评论者的真诚程度如何？",
    "你认为评论者的可信程度如何？",
    "你认为评论者的道德程度如何？",
  ];
  const [quizAnswer, setQuizAnswer] = useState(Array(66).fill(0));
  const handleToA = () => {
    if (quizAnswer.includes(0)) alert("请完成所有题目！");
    else {
      const answerB = quizAnswer.join(" ");
      const { user_name, group_id, timeStr, sex, point } = props.info;
      Service.postQuizB(user_name, group_id, timeStr, sex, point, answerB).then(
        () => {
          alert("提交成功");
          navigate("/layout/quizsend");
        }
      );
    }
  };
  const radios = [1, 2, 3, 4, 5];
  const radiosB = [1, 2, 3, 4, 5, 6, 7];
  const radioTypeB = [
    "非常不",
    "比较不",
    "有点不",
    "中立",
    "有点",
    "比较",
    "非常",
  ];
  const radiosTypeBB = ["低龄化", "愿助人", "友好", "真诚", "可信", "道德"];
  const radioType = [
    "从来没有",
    "偶尔如此",
    "有时如此",
    "经常如此",
    "总是如此",
  ];
  const handleQuizA = (e, index) => {
    setQuizAnswer((answer) => {
      answer[index] = e.target.value;
      return answer;
    });
  };
  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, []);
  return (
    <div className="quiz-c">
      <div className="quiz-i">
        <div className="quiz-h">问卷B</div>
        <div className="quiz-content">
          <div className="quiz-t">
            <div className="quiz-q">
              {quizB.map((quiz, index) => {
                return (
                  <div className="quiz-q-i" key={quiz}>
                    <div className="quiz-ques">
                      <b>{quiz}</b>
                    </div>
                    <div className="quiz-radios-B">
                      {radiosB.map((radio) => {
                        let type = radio - 1 === 3 ? "" : radiosTypeBB[index];
                        return (
                          <div className="quiz-rt-B">
                            <div className="quiz-type">
                              <b>{radioTypeB[radio - 1] + type}</b>
                            </div>
                            <label
                              className="quiz-label-B"
                              htmlFor={`${index}` + radio}
                            >
                              <input
                                className="radio-in"
                                name={quiz}
                                type="radio"
                                value={radio}
                                id={`${index}` + radio}
                                onChange={(e) => handleQuizA(e, index)}
                              />
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="quiz-t">
            <h4>
              <span className="red">*&nbsp;</span>
              下面是你在学习中可能有的一些情绪体验，请您选择一个最符合你实际情况的答案。
            </h4>
            每道题后面的五个数字代表这些情绪体验出现的不同频率：
            <br />
            1代表 “从来没有”；
            <br />
            2代表“偶尔如此”；
            <br />
            3代表“有时如此”；
            <br />
            4代表“经常如此”；
            <br />
            5代表 “总是如此”。
            <br />
            请仔细阅读每一道题目，并自行选择。
          </div>
          <div className="quiz-q">
            {quizAs1.map((quiz, index) => {
              index = index + 6;
              return (
                <div className="quiz-q-i" key={quiz}>
                  <div className="quiz-ques">
                    <b>{quiz}</b>
                  </div>
                  <div className="quiz-radios">
                    {radios.map((radio) => {
                      return (
                        <div
                          key={quiz + radio}
                          className={
                            (index - 6) % 10 === 0 ? "quiz-rt" : "quiz-radio"
                          }
                        >
                          {(index - 6) % 10 === 0 ? (
                            <div className="quiz-type">
                              <b>{radioType[radio - 1]}</b>
                            </div>
                          ) : null}
                          <label
                            className="quiz-label"
                            htmlFor={`${index}` + radio}
                          >
                            <input
                              className="radio-in"
                              name={quiz}
                              type="radio"
                              value={radio}
                              id={`${index}` + radio}
                              onChange={(e) => handleQuizA(e, index)}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="quiz-t">
            <h4>
              <span className="red">*&nbsp;</span>
              下面是你在学习中可能有的一些自我效能感体验，请您选择一个最符合你实际情况的答案。
            </h4>
            每道题后面的五个数字代表这些自我效能感体验出现的不同频率：
            <br />
            1代表 “从来没有”；
            <br />
            2代表“偶尔如此”；
            <br />
            3代表“有时如此”；
            <br />
            4代表“经常如此”；
            <br />
            5代表 “总是如此”。
            <br />
            请仔细阅读每一道题目，并自行选择。
          </div>
          <div className="quiz-q">
            {quizAs2.map((quiz, index) => {
              index = index + 50;
              return (
                <div className="quiz-q-i" key={quiz}>
                  <div className="quiz-ques">
                    <b>{quiz}</b>
                  </div>
                  <div className="quiz-radios">
                    {radios.map((radio) => {
                      return (
                        <div
                          key={quiz + radio}
                          className={
                            index % 10 === 0 ? "quiz-rt" : "quiz-radio"
                          }
                        >
                          {index % 10 === 0 ? (
                            <div className="quiz-type">
                              <b>{radioType[radio - 1]}</b>
                            </div>
                          ) : null}
                          <label
                            className="quiz-label"
                            htmlFor={`${index}` + radio}
                          >
                            <input
                              className="radio-in"
                              name={quiz}
                              type="radio"
                              value={radio}
                              id={`${index}` + radio}
                              onChange={(e) => handleQuizA(e, index)}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div onClick={handleToA} className="tostudy">
        提交
      </div>
    </div>
  );
}
