class Api::V1::SearchController < ApplicationController
  def posts
    posts_per_page = 2
    @posts = Post.where("title LIKE ? OR body LIKE ?", "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)
    post_with_images = paginate_posts(@posts, posts_per_page)
    total_post_count = @posts.count

    render json: {
      posts: post_with_images,
      total_count: total_post_count,
      per_page: posts_per_page
    }
  end
end
