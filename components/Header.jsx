import React, { useContext, useState, useEffect } from 'react'
import Link from "next/link"
import { getCategories } from '../services';


// const categories = [
//     { name: "Cosmic Art", slug: "cosmicart"},
//     { name: "Nature", slug: "nature"},   
// ]


const Header = () => {
    
    const [categories, setCategories] = useState([]);
    
    useEffect( () => {
      getCategories()
        .then( (newCategories) => setCategories(newCategories) )
    }, []);
    
  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="border-b w-full inline-block border-gray-500 py-8">
            <div className='md:float-left block'>
                <Link href="/">
                    <span className='transition duration-700 cursor-pointer hover:text-orange-700 font-bold text-4xl text-white'>
                        FX Gallery
                    </span>
                </Link>
            </div>
            <div className="hidden md:float-lef md:contents">
                {categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Header