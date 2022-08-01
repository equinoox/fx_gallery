import Link from 'next/link'
import React from 'react'

const HomeHeading = () => {
  return (
    <div className="flex justify-center items-center container full-content mx-auto mb-8 px-10">
      <div className="blob bg-white absolute z-0"></div>
        <div className="text-lg text-white ml-16 z-10 ">
          <h1 className="text-center text-4xl mb-6">Embrase new content using <b className="text-orange-700 ml-2">FX GALLERY.</b></h1>
          <p className="text-center text-xl">Enjoy a modern UI/UX experience and explore modern and interesting topics from many parts of the modern age.</p>
        </div>


      <div className="text-center absolute bottom-8 ">
        <Link href="#home">
          <span className="transition duration-500 transform hover:-traslate-y-1 inline-block bg-orange-700 hover:bg-orange-400 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Jump In!
          </span>
        </Link>
      </div>

    </div>
  )
}

export default HomeHeading
