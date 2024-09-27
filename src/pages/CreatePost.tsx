import React from 'react'

const CreatePost = () => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Body:
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Create Post'}
      </button>
    </form>
    </div>
  )
}

export default CreatePost