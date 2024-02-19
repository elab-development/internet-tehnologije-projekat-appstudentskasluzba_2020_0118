import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function PostForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [post, setPost] = useState({
        id: null,
        title: '',
        content: ''
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/posts/${id}`)
                .then(({ data }) => {
                    setPost(data);
                    console.log(post)
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (post.id) {
            axiosClient.put(`/posts/${post.id}`, post)
                .then(() => {
                    setNotification("Post je uspešno ažuriran!");
                    navigate('/posts');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post('/posts', post)
                .then(() => {
                    setNotification("Post je uspešno kreiran!");
                    navigate('/posts');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            <header>
                {post.id ? <h1>Ažuriranje Posta</h1> : <h1>Novi Post</h1>}
            </header>
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Učitavanje...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <textarea onChange={e => setPost({ ...post, title: e.target.value })} placeholder="Naslov" value={post.title} required />
                        <textarea onChange={e => setPost({ ...post, content: e.target.value })} placeholder="Sadržaj" value={post.content} required />
                        <button className="btn">Sačuvaj</button>
                    </form>
                )}
            </div>

        </>
    );
}