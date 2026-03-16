const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((favourite, blog) => {
        return (favourite.likes > blog.likes) ? favourite : blog
    })
}

const mostBlogs = (blogs) => {
    const blogCounts = {}
    blogs.forEach(blog => {
        blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1
    })

    let maxBlogs = 0
    let authorWithMostBlogs = null

    for (const author in blogCounts) {
        if (blogCounts[author] > maxBlogs) {
            maxBlogs = blogCounts[author]
            authorWithMostBlogs = author
        }
    }

    return {
        author: authorWithMostBlogs,
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    const likeCounts = {}
    blogs.forEach(blog => {
        likeCounts[blog.author] = (likeCounts[blog.author] || 0) + blog.likes
    })

    let maxLikes = 0
    let authorWithMostLikes = null

    for (const author in likeCounts) {
        if (likeCounts[author] > maxLikes) {
            maxLikes = likeCounts[author]
            authorWithMostLikes = author
        }
    }

    return {
        author: authorWithMostLikes,
        likes: maxLikes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}