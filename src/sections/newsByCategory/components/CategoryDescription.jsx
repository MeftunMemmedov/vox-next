import React from 'react'

const CategoryDescription = ({categoryName}) => {
  return (
    <p className='my-3 font-md italic text-center'>
        {
            categoryName==="Politic"&&"Vox's politics team explains everything you need to know about what's going on in Washington and what it means for your life."
            
        }
    </p>
  )
}

export default CategoryDescription