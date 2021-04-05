import { forwardRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import '../styles/Form.css'

const Textbox = forwardRef(({name, id, label, ...props}, ref) => {
    id = id || name.toLowerCase().replace(' ', '-') + '-textbox'
    return (
        <div className='textbox-field form-item'>
            <label htmlFor={id}>{label || name}</label>

            <TextareaAutosize
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default Textbox