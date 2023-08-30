import React from 'react'

function YoutubeForm() {
  return (
    <div className='youtubeForm'>
        <form>
            <label htmlFor="Username">User Name</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" />

            <label htmlFor="channel">Channel</label>
            <input type="text" name="channel" id="channel" />

            <button>Submit</button>
        </form>
    </div>
  )
}
export default YoutubeForm