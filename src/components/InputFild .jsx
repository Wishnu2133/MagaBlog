import React ,{useId} from 'react';

const InputFild = React.forwardRef(function Input({
    lable, // lable : what you what that user give Input like Name, username , email , or else
    type= "text", // type of input can be enything initial we take text
    className = " ", // we can add more thing in className according where we use this Input  
    ...prop // spreading other property that we can add if we want  
}, ref ) { 

    const id = useId()
    return (
        <div>
            {lable && <label className='inline-blok mb-1 pl-2' htmlFor={id}>{lable}</label>}
            <input
            type={type} // tyep if use give othervice bydefault it will etxt
            
            // we inset className as averiable so if user give any css then it will be add on in 
            className={`text-black bg-slate-200 rounded-lg outline-none focus:bg-gray-200 duration-200 ${className}`}
                ref={ref} // 
                {...prop}
                id={id}
            />
        </div>
    )
})


export default InputFild;