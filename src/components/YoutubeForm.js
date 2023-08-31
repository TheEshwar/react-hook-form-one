import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

function YoutubeForm() {
  const form = useForm({
    // ********** Static Default values **********
    // defaultValues: {
    //   username: "Eshwar",
    //   email: "",
    //   channel: ""
    // }
    defaultValues: async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/users/2')
      const data = await result.json()
      console.log('data :- ', data);

      return {
        username: data.name,
        email: data.email,
        channel: "",
        social: {
          twitter: "",
          facebook: ""
        },
        phoneNumbers: ["",""]
      }
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

            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <input type="text" name="twitter" {...register("social.twitter")} />
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <input type="text" name="facebook" {...register("social.facebook")} />
            </div>

            <div className="form-control">
              <label htmlFor="primary-phone">Primary Phone Number</label>
              <input type="text" name="primary-phone" {...register("phoneNumbers[0]")} />
            </div>

            <div className="form-control">
              <label htmlFor="secondary-phone">Secondary Phone Number</label>
              <input type="text" name="secondary-phone" {...register("phoneNumbers[1]")} />
            </div>

            <div className="form-control">
              <label htmlFor="third-phone">Third Phone Number</label>
              <input type="text" name="third-phone" {...register("phoneNumbers[2]")} />
            </div>

            <button>Submit</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}
export default YoutubeForm