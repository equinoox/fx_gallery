import React, { useRef, useState, useEffect } from 'react'

import { submitComment } from "../services";

const CommentsForm = ( {slug} ) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect( () => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, [])
  
  const handleCommentSubmission = () => {
      setError(false);

      const { value: comment } = commentEl.current;
      const { value: name } = nameEl.current;
      const { value: email } = emailEl.current;
      const { checked: storeData } = storeDataEl.current;

      if(!comment || !name || !email) {
        setError(true);
        return;
      }

      const commentObj = { name,email,comment, slug };

      if(storeData) {
        window.localStorage.setItem("name", name);
        window.localStorage.setItem("email", email)
      } else {
        window.localStorage.removeItem("name", name)
        window.localStorage.removeItem("eamil", email)
      }

      submitComment(commentObj)
        .then( (res) => {
          setShowSuccessMessage(true);
          
          setTimeout( () => {
            setShowSuccessMessage(false);
          }, 3000)
        })
  }


  return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-white text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              {/*COMMENT*/}
              <textarea 
              ref={commentEl} 
              className="p-4 outline-none w-full rounded-lg focus-ring-2 focus:ring-gray-200 bg-gray-100 text-gray-800"
              placeholder="Comment"
              name="comment"
              />
            </div>

            <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 mb-4">
              {/*NAME*/}
              <input
              type="text"
              ref={nameEl}
              className="p-2 px-4 outline-none w-full rounded-lg focus-ring-2 focus:ring-gray-200 bg-gray-100 text-gray-800"
              placeholder="Name"
              name="name"
              />
              {/*EMAIL*/}
              <input
              type="text"
              ref={emailEl}
              className="p-2 px-4 outline-none w-full rounded-lg focus-ring-2 focus:ring-gray-200 bg-gray-100 text-gray-800"
              placeholder="Email (example@gmail.com)"
              name="email"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <input
                ref={storeDataEl}
                type="checkbox"
                id="storeData"
                name="storeData"
                value="true"
                />
                <label className="text-white cursor-pointer ml-2" htmlFor="storeData">Save my E-mail and Name for next comment.</label>
              </div>
            </div>
            {error && <p className="text-xs text-red-500">All fields are required!</p>}
            <div className="mt-8">
              <button 
              type="button" 
              onClick={handleCommentSubmission}
              className="transition duration-500 ease hover:bg-orange-400 inline-block bg-orange-700 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
            >
            Post Comment
            </button>
            {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for reveiw.</span>}
            </div>
        </div>
  )
}

export default CommentsForm