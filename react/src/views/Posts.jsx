import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Posts() {
    const [currentUserRole, setCurrentUserRole] = useState();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setCurrentUserRole(data.role);
                getPosts();
            });
    }, [navigate]);

    const getPosts = () => {
        setLoading(true);
        axiosClient.get('/posts')
            .then(response => {
                console.log(response.data.data);
                setLoading(false);
                setPosts(response.data.data);
            })
            .catch(error => {
                setLoading(false);
                console.error("There was an error fetching the posts", error);
            });
    };

    const onDelete = (post) => {
        if (currentUserRole === 'admin' && !window.confirm("Da li ste sigurni da želite obrisati ovaj post?")) {
            return
        }
        axiosClient.delete(`/posts/${post.id}`)
            .then(() => {
                setNotification("Post je uspešno obrisan!");
                getPosts();
            });
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Vesti</h1>
                {currentUserRole === 'admin' && <Link to="/posts/new" className='btn-add'>Dodaj Novu Vest</Link>}
            </header>
            <div className='card animated fadeInDown'>
                {loading && <div className='text-center'>Učitavanje...</div>}
            {!loading && (
                    <div>
                        {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(post => (
                            <div key={post.id} className='post-container'>
                                <div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <h2>{post.title}</h2>
                                        <p>{post.content}</p>
                                    </div>
                                    <h3>{post.created_at}</h3>
                                </div>
                                <div className='post-buttons'>
                                    {(currentUserRole === 'admin' || currentUserRole === 'profesor') && (
                                        <Link to={`/posts/${post.id}`} className='btn-edit'>Izmeni</Link>
                                    )}
                                    {currentUserRole === 'admin' && (
                                        <button onClick={() => onDelete(post)} className='btn-delete'>Ukloni</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
