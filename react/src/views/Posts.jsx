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
                if (data.role !== 'admin' && data.role !== 'profesor') {
                    navigate('/news');
                } else {
                    getPosts();
                }
            });
    }, [navigate]);

    const getPosts = () => {
        setLoading(true);
        axiosClient.get('/posts')
            .then(response => {
                setLoading(false);
                setPosts(response.data);
            })
            .catch(error => {
                setLoading(false);
                console.error("There was an error fetching the posts", error);
            });
    };

    const onDelete = (post) => {
        if (currentUserRole === 'admin' && window.confirm("Da li ste sigurni da želite obrisati ovaj post?")) {
            axiosClient.delete(`/posts/${post.id}`)
                .then(() => {
                    setNotification("Post je uspešno obrisan!");
                    getPosts();
                });
        }
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Vesti</h1>
                {currentUserRole === 'admin' && <Link to="/posts/new" className='btn-add'>Dodaj Novi Post</Link>}
            </header>
            <div className='card animated fadeInDown'>
                {loading && <div className='text-center'>Učitavanje...</div>}
                {!loading && (
                    <div>
                        {posts.map(post => (
                            <div key={post.id}>
                                <h1>{post.title}</h1>
                                <p>{post.text}</p>
                                <div>
                                    {(currentUserRole === 'admin' || currentUserRole === 'profesor') && (
                                        <Link to={`/posts/edit/${post.id}`} className='btn-edit'>Izmeni</Link>
                                    )}
                                    {currentUserRole === 'admin' && (
                                        <button onClick={() => onDelete(post)} className='btn-delete'>Ukloni</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Paginacija ako je potrebna */}
            </div>
        </div>
    );
}
