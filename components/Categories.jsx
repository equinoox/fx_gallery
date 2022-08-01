import React from 'react';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { getCategories } from '../services';


const Categories = () => {
  
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    getCategories()
      .then( (newCategories) => setCategories(newCategories) )
  }, []);

  return (
    <div className="bg-black bg-opacity-60 shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-white text-xl mb-8 font-semibold border-b pb-4">
        Categories
      </h3>
      {categories.map( (category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">
            <div className="transition duration-700 bg-gray-200 container py-2 text-center rounded hover:bg-gray-500 hover:text-orange-700">
              {category.name}
            </div>
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories