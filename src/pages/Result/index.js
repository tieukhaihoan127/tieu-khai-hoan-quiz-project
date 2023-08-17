import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {  getAnswerId, getListId, getQuestions } from "../../services/usersServices";
import "./Result.scss";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Result() {
    const params = useParams();

    const [dataResult,setDataResult] = useState([]);
    const [info,setInfo] = useState([]);

    useEffect(() => {
        const fetchApi = async ()  => {
            const dataAnswers = await getAnswerId(params.id);
            const dataQuestions = await getQuestions(dataAnswers.topicId);
            let result = [];
            for(let i=0; i < dataQuestions.length; i++){
                result.push({
                    ...dataQuestions[i],
                    ...dataAnswers.answers.find(item => item.questionId === dataQuestions[i].id)
                });
            }
            setDataResult(result);

            const dataTopic = await getListId(dataAnswers.topicId);

            const info = {
                totalAnswers: result.length,
                countAnswersTrue: 0,
                countAnswersFalse: 0,
                percent: 0,
                title: dataTopic.name,
                topicId: dataAnswers.topicId
            }
        
            for(let i=0; i < result.length; i++){
                if(result[i].answer === result[i].correctAnswer){
                    info.countAnswersTrue++;
                }
            }

            info.countAnswersFalse = info.totalAnswers - info.countAnswersTrue;
            info.percent = Number(((info.countAnswersTrue/info.totalAnswers)*100).toFixed(0));
            setInfo(info);
        }

        setTimeout(fetchApi,1000);

    },[]);
    let len = 0;
    if(window.innerWidth < 576){
        len = 2;
    }
    else{
        len = 20;
    }
    let tmp = [];
    for (let i = 0; i < len; i++) {
        tmp.push(i);
    }

    return(
        <>
        {info.totalAnswers !== undefined ? (<>
            <h2>Kết quả chủ đề: {info.title}</h2>
            <div>
                <span>Đúng: <strong>{info.countAnswersTrue}</strong></span>
                <span> | Sai: <strong>{info.countAnswersFalse}</strong></span>
                <span> | Tổng số câu: <strong>{info.totalAnswers}</strong></span>
                <span> | Tỷ lệ đúng: <strong>{info.percent}%</strong></span>
            </div>

            {dataResult.length > 0  && (
                <div className="result__background">
                    <div className="result">
                    {dataResult.map((item,i) => (
                        <div className="result__item" key={item.id}>
                            <p className="result__questions">
                                Câu {i + 1}: {item.question}
                                {item.answer === item.correctAnswer ? (<>
                                <span className="result__tag result__tag--true">Đúng</span>
                                </>):(<>
                                <span className="result__tag result__tag--false">Sai</span>
                                </>)}
                            </p>
                            {item.answers.map((answer,index) => {
                                let checked = false;
                                let className = "";
                                if(item.answer === index){
                                    checked = true;
                                    className="result__item--selected"
                                }
                                if(item.correctAnswer === index){
                                    className="result__item--result"
                                }
                                return(
                                    <div className="result__answers" key={index}>
                                        <input type="radio" checked={checked} disabled />
                                        <label className={className}>{answer}</label>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
                </div>
            )}
            </>):(<div className="skeleton">
            
                <h2 className="skeleton__title"><Skeleton width={300} borderRadius={25}/></h2>
            <div className="span__skeleton">
                <span className="span__skeleton--1"><Skeleton width={60} borderRadius={25}/></span>
                <span className="span__skeleton--2"><Skeleton width={60} borderRadius={25}/></span>
                <span className="span__skeleton--3"><Skeleton width={120} borderRadius={25}/></span>
                <span className="span__skeleton--4"><Skeleton width={120} borderRadius={25}/></span>
            </div>

            {tmp.map(item => (
                    <div key={item} className="skeleton__body">
                            <p className="skeleton__question">
                            <Skeleton width={200} borderRadius={25}/>
                            </p>
                                <div className="skeleton__answers">
                                    <Skeleton  width={300} borderRadius={25}/>
                                    <Skeleton  width={270} borderRadius={25}/>
                                    <Skeleton  width={270} borderRadius={25}/>
                                </div>
                        </div>
                ))}
                <div className="skeleton__button"><Skeleton width={100} borderRadius={25}/></div>
            
            </div>)}
        {info.totalAnswers !== undefined ? (
            <Link to={"/quiz/" + info.topicId} className="result__cover">
                <button className="button">Làm lại</button>
            </Link>
        ):(<>
            <div><Skeleton width={130} height={30} borderRadius={25}/></div>
        </>)}
        </>
    )
}

export default Result;