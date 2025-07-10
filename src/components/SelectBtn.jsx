import React , {useId} from 'react';
function SelectBtn({
    option,
    label,
    className = " ",
    ...props
},ref) {

    const  id = useId()
    return (
        <div>
            {label && <label htmlFor={id} className=''></label>}
            <select id={id} ref={ref} {...props} className={` ${className}`}>
            
                {option ?.map((option)=>{
                    <option key={option} value={option}>{option}</option>
                })}
            
            </select>
        </div>
    )
}

export default React.forwardRef(SelectBtn);