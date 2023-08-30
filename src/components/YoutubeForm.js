import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

function YoutubeForm() {
  const form = useForm({
    defaultValues: {
      username: "Eshwar",
      email: "",
      channel: ""
    }
  })

  const {register, control, handleSubmit, formState} = form
  const { errors } = formState

  // Approach 1 - to register form control with react-hook-form hook
  // const {name, ref, onChange, onBlur} = register("username")

  const onSubmit = (data) =>{
    console.log('Form submitted :- \n', data);
  }

  const notAdmin = (fieldValue) => {
    return fieldValue != "admin@gmail.com" || 
    'Enter a different email address'
  }
  const notBlackListed = (fieldValue) => {
    return !fieldValue.endsWith('notvalid.com') ||
    'This domain is not supported'
  } 
  return (
    <div className='youtubeForm'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='form-control'>
            <label htmlFor="Username">User Name</label>
            {/* Approach 1  */}
            {/* <input type="text" name={name} ref={ref} onChange={onChange} onBlur={onBlur} /> */}
            {/* Approach 2 */}
            <input type="text" id='username' {...register("username", {
              required: {
                value: true,
                message: 'Username is required'
              }
            })} />
            <p className='errorP'>{errors.username?.message}</p>
            </div>

            <div className='form-control'>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email"  {...register("email", {
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email format',
              },
              validate: {notAdmin, notBlackListed}
            })} />
            <p className='errorP'>{errors.email?.message}</p>
            </div>

            <div className='form-control'>
            <label htmlFor="channel">Channel</label>
            <input type="text" id="channel"  {...register("channel", {
              required: {
                value: true,
                message: 'Channel name is required'
              }
            })} />
            <p className='errorP'>{errors.channel?.message}</p>
            </div>

            <button>Submit</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}
export default YoutubeForm