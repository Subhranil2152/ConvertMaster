import React, { useEffect } from 'react'
import {motion} from "framer-motion"

const Table = ({data}) => {

   
    // console.log(data)

    // const tableValues = [];
    
    // const ob = {"sys_name":"",
    //             "count" : 0};

    // data.forEach(element => {
        
    //     ob.sys_name = element.sys_product;
    //     ob.count += element.count_of_sample_id
    //     tableValues.push(ob);
    // });

    // console.log(tableValues);
    let totalSum = 0;

    data.forEach((item)=>{
        totalSum+=item.total_sample_count;
        // console.log(item.total_sample_count)
    })

    // console.log(totalSum);

  return (
    <motion.div className='m-3 p-8 border rounded-md shadow-md flex justify-center items-center h-96'
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    >
        <div className='relative flex flex-col w-full mb-3'>
        <table className='w-auto'>
        <caption className="caption-top pb-8 font-bold">
            <div>No. of Samples per Product</div>
            </caption>
            <thead>
                <tr className='border border-solid border-l-0 border-r-0'>
                    <th className='px-6 py-3'>Sys Product</th>
                    <th className='px-6 py-3'>Count of Sample ID</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=>{
                    return <tr key={index}>
                        <td className='px-6 py-3 text-center'>
                            {item.sys_product}
                        </td>
                        <td className='px-6 py-3 text-center'>
                            {item.total_sample_count}
                        </td>
                    </tr>
                })}
                <tr className='border border-solid border-l-0 border-r-0'>
                    <td className='px-6 pt-3 pb-2 text-center border border-solid border-l-0 border-b-0 border-r-0'>
                        <strong>Grand Total</strong>
                    </td>
                    <td className='px-6 pt-3 pb-2 text-center border border-solid border-l-0 border-b-0 border-r-0'>
                        <strong>{totalSum}</strong>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </motion.div>
  )
}

export default Table