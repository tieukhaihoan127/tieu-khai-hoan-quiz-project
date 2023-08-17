import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListId, getQuestions, postListAnswers } from "../../services/usersServices";
import { getCookie } from "../../helpers/cookie";
import "./Quiz.scss";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Quiz() {
    const params = useParams();
    const [dataTopic, setDataTopic] = useState([]);
    const [dataQuestions, setDataQuestions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListId(params.id);
            if (response) {
                setDataTopic(response);
            }
        }
        setTimeout(fetchApi, 1000);
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getQuestions(params.id);
            if (response) {
                setDataQuestions(response);
            }
        }
        setTimeout(fetchApi, 1000);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let selectedAnswers = [];
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].checked === true) {
                selectedAnswers.push({
                    questionId: Number(e.target[i].name),
                    answer: Number(e.target[i].value)
                });
            };
        }

        let options = {
            userId: getCookie("id"),
            topicId: params.id,
            answers: selectedAnswers
        }

        const response = await postListAnswers(options);
        if (response) {
            navigate(`/result/${response.id}`);
        }
    }

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
    console.log(dataQuestions);
    return (
        <div className="quiz__background">
            <div className="quiz">
                {dataTopic.id !== undefined ? (<>
                    <h2 className="quiz__title">Bài Quiz chủ đề: {dataTopic.name}</h2>
                </>) : (<div className="skeleton__title">
                    <Skeleton width={300} height={30} borderRadius={25} />
                </div>)}

                {dataQuestions.length > 0 ? (<>
                    <div className="form__quiz">
                        <form onSubmit={handleSubmit}>
                            {dataQuestions.map((item, i) => (
                                <div className="form-quiz__item" key={item.id}>
                                    <p>
                                        Câu {i + 1}: {item.question}
                                    </p>
                                    {item.answers.map((answer, index) => (
                                        <div key={index}>
                                            {<input
                                                type="radio"
                                                name={item.id}
                                                value={index}
                                                id={`quiz-${item.id}-${index}`}
                                                required
                                            />}
                                            {<label htmlFor={`quiz-${item.id}-${index}`}>{answer} </label>}
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button className="button">Nộp bài</button>
                        </form>
                    </div>
                </>) : (
                    <div className="skeleton">
                        {tmp.map(item => (
                            <div key={item}>
                                <p className="skeleton__question">
                                    <Skeleton width={200} borderRadius={25} />
                                </p>
                                <div className="skeleton__answers">
                                    <Skeleton width={300} borderRadius={25} />
                                    <Skeleton width={270} borderRadius={25} />
                                    <Skeleton width={270} borderRadius={25} />
                                </div>
                            </div>
                        ))}
                        <div className="skeleton__button"><Skeleton width={130} height={30} borderRadius={25} /></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Quiz;