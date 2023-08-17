import { useEffect, useState } from "react";
import { getListAnswers, getListTopics } from "../../services/usersServices";
import { Link } from "react-router-dom";
import 'animate.css';
import "./Answers.scss";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function Answers() {
    const [dataAnswers, setDataAnswers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const listAnswer = await getListAnswers();
            const dataTopic = await getListTopics();
            if (listAnswer) {
                let result = [];
                console.log(listAnswer);
                console.log(dataTopic);
                for (let i = 0; i < listAnswer.length; i++) {
                    result.push({
                        ...listAnswer[i],
                        ...dataTopic.find(item => (item.id == listAnswer[i].topicId)),
                        id: listAnswer[i].id
                    });
                }
                console.log(result);
                setDataAnswers(result.reverse());
            }
        }

        fetchApi();
    }, []);

    let len = 0;

    if(window.innerWidth < 576){
        len = 5;
    }
    else{
        len = 10;
    }

    let tmp = [];
    for (let i = 0; i < len; i++) {
        tmp.push(i);
    }

    return (
        <>
            {dataAnswers.length > 0 ? (<div className="answers animate__animated animate__slideInLeft">
                <h2>Danh sách bài đã luyện tập</h2>

                {dataAnswers.length > 0 && (
                    <table border="1" rules="all" width="100%" height="100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tên chủ đề</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataAnswers.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="button__center">
                                            <Link to={"/result/" + item.id} className="topic__button animate">Xem chi tiết</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>) : (<>
                <div><Skeleton width={300} borderRadius={25} height={25} /></div>
                <div className="topic__skeleton">
                    {tmp.map(item => (
                        <div key={item}>
                            <div className="topic__form">
                                <div className="topic__form--1"><Skeleton width={50} borderRadius={25} height={20} /></div>
                                <div className="topic__form--2"><Skeleton width={90} borderRadius={25} height={20} /></div>
                                <div className="topic__form--3"><Skeleton width={130} borderRadius={25} height={20} /></div>
                            </div>
                        </div>
                    ))}
                </div>

            </>)}
        </>
    )
}

export default Answers;