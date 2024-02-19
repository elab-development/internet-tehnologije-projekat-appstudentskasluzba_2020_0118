<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(
            Post::query()->orderBy("id", "desc")->paginate()
        );
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $post = Post::create($data);
        return response([new PostResource($post), 201]);
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();
        $post->update($data);
        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response("", 204);
    }
}
