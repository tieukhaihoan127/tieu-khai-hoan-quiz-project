import { useEffect, useState } from "react";
import { getListTopics } from "../../services/usersServices";
import { Link } from "react-router-dom";
import "./Topic.scss";
import "animate.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Topic() {
    const [topic, setTopic] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopics();
            setTopic(response);
        }
        fetchApi();
    }, []);
    let tmp = [];
    for (let i = 0; i < 5; i++) {
        tmp.push(i);
    }
    return (
        <>
            {topic.length > 0 ? (
                <div className="topic animate__animated animate__slideInLeft" >
                    <h2 className="topic__title">Danh sách chủ đề ôn luyện</h2>
                    {topic.length > 0 && (
                        <table border="1" rules="all" width="100%" height="100%">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Tên chủ đề</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topic.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <div className="topic__link">
                                                <Link to={"/quiz/" + item.id} className="topic__button animate" >Làm bài</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ) : (<>
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

export default Topic;