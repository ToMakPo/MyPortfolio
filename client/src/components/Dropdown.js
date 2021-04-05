import { forwardRef } from 'react'

import '../styles/Form.css'

const Dropdown = forwardRef(({name, options, id, label, ...props}, ref) => {
    id = id || name.toLowerCase().replace(' ', '-') + '-dropdown'
    return (
        <div className='dropdown-field form-item'>
            <label htmlFor={id}>{label || name}</label>

            <select
                id={id}
                ref={ref}
                {...props}
            >
                {options.map((option, i) => 
                    <option key={i} value={option}>{option}</option>
                )}
            </select>
        </div>
    )
})

export default Dropdown