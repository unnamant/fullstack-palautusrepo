const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 24)
  })
})

describe('favourite blog', () => {
    const listWithMultipleBlogs = [
    {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 12,
    __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]

  test('when list has multiple blogs', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
  test('when list has multiple blogs with same likes', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs)

    assert.strictEqual(result.likes, 12)
    
    const possibleTitles = ['React patterns', 'Canonical string reduction']
    assert.ok(possibleTitles.includes(result.title))
  })
})

describe('most blogs', () => {
  const blogs = [
    {
      title: "Blog1",
      author: "Robert C. Martin"
    },
    {
      title: "Blog2",
      author: "Robert C. Martin"
    },
    {
      title: "Blog3",
      author: "Robert C. Martin"
    },
    {
      title: "Blog1",
      author: "Edsger W. Dijkstra"
    },
    {
      title: "Blog2",
      author: "Edsger W. Dijkstra"
    },
    {
      title: "Blog3",
      author: "Edsger W. Dijkstra"
    }
  ]

  test('when list has multiple blogs and authors', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('when list has multiple authors with same amount of blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    assert.strictEqual(result.blogs, 3)
    
    const possibleAuthors = ['Robert C. Martin', 'Edsger W. Dijkstra']
    assert.ok(possibleAuthors.includes(result.author))
  })
})

describe('most likes', () => {
  const blogs = [
    {
      title: "Blog1",
      author: "Robert C. Martin",
      likes: 2
    },
    {
      title: "Blog2",
      author: "Robert C. Martin",
      likes: 3
    },
    {
      title: "Blog3",
      author: "Robert C. Martin",
      likes: 5
    },
    {
      title: "Blog1",
      author: "Edsger W. Dijkstra",
      likes: 4
    },
    {
      title: "Blog2",
      author: "Edsger W. Dijkstra",
      likes: 6
    },
    {
      title: "Blog3",
      author: "Edsger W. Dijkstra",
      likes: 1
    }
  ]

  test('when list has multiple blogs and authors', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 11
    })
  })

  const blogsWithTie = [
      {
        title: "Blog 1",
        author: "Edsger W. Dijkstra",
        likes: 10
      },
      {
        title: "Blog 2",
        author: "Ed§ger W. Dijkstra",
        likes: 5
      },
      {
        title: "Blog 3",
        author: "Robert C. Martin",
        likes: 8
      },
      {
        title: "Blog 4",
        author: "Robert C. Martin",
        likes: 7
      }
    ]

  test('when list has multiple authors with same amount of likes', () => {
    const result = listHelper.mostLikes(blogsWithTie)

    assert.strictEqual(result.likes, 15)
    
    const possibleAuthors = ['Robert C. Martin', 'Edsger W. Dijkstra']
    assert.ok(possibleAuthors.includes(result.author))
  })
})