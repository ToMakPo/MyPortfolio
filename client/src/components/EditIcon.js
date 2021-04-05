import { TiEdit } from "react-icons/ti"

function EditIcon({className, size, ...props}) {
    className = 'edit-button' + (className ? (' ' + className) : '') 
    return <TiEdit
        className={className}
        size={size || 30}
        {...props}
    />
}

export default EditIcon