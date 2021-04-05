import { useState, useRef, useEffect } from 'react'
import Moment from 'react-moment';
import AddIcon from '../components/AddIcon'
import CloseIcon from '../components/CloseIcon'
import EditIcon from '../components/EditIcon'
import Input from '../components/Input'
import Textbox from '../components/Textbox'
import API from '../utils/API'

import '../styles/Admin.css'
import '../styles/Form.css'

function Education({setModal}) {
    const [records, setRecords] = useState()

    useEffect(async _ => {
        setRecords(await API.getEducation())
    }, [])

    return (
        <section id='education-section'>
            <div className='section-header'>
                <h2>Education</h2>
                <AddIcon onClick={_ => setModal(<Modal/>)}/>
            </div>
            <div className='items'>
                {records?.map((data, i) => <Item key={i} {...data}/>)}
            </div>
        </section>
    )

    function Item(data) {
        const {school, degree, fieldOfStudy, location, startDate, endDate, description, imagePath} = data
        
        return (
            <div className='item'>
                {imagePath 
                    ? <img src={imagePath} alt={`${school} school logo`}/>
                    : <span></span>
                }
                <div>
                    <h3>{school}</h3>
                    <div>{degree}</div>
                    <div>{fieldOfStudy}</div>
                    <small>
                        <Moment format={"MMM YYYY"} date={startDate}/>{' - '}
                        {endDate ? <Moment format={"MMM YYYY"} date={endDate}/> : 'Present'}
                        {location && ' • ' + location}
                    </small>
                    {
                        description.length > 0 &&
                        <>
                            <hr/>
                            <div>{
                                description?.map((line, i) => {
                                    if (Array.isArray(line)) {
                                        return <ul key={i} >{line.map((item, j) => <li key={j}>{item}</li>)}</ul>
                                    } else {
                                        return <p key={i}>{line}</p>
                                    }
                                })
                            }</div>
                        </>
                    }
                </div>
                <EditIcon onClick={_ => setModal(<Modal data={data}/>)}/>
            </div>
        )
    }

    function Modal({data}) {
        const [isNew] = useState(data === undefined)
        
        const id = useRef(data?._id)
        const schoolInput = useRef()
        const degreeInput = useRef()
        const fieldOfStudyInput = useRef()
        const locationInput = useRef()
        const startDateInput = useRef()
        const endDateInput = useRef()
        const descriptionTextbox = useRef()
        const imagePathInput = useRef()

        function stringifyDescription() {
            return data?.description
                .map(line => {
                    if (Array.isArray(line)) {
                        line = line.map(li => ' - ' + li).join('\n\n')
                    }
                    return line
                })
                .join('\n\n') || ''
        }

        function parseDescription(description) {
            const oldDescription = description.split('\n')
            const newDescription = []
            const list = []

            while (oldDescription.length > 0) {
                const line = oldDescription.shift().trim()
                if (line === '') continue

                const split = line.split(/^\W*-\W*/)
                if (split.length == 2) {
                    if (split[1] !== '') {
                        list.push(split[1])
                    }
                    continue
                }

                if (list.length > 0) {
                    newDescription.push([...list])
                    list.length = 0
                }

                newDescription.push(line)
            }

            if (list.length > 0) {
                newDescription.push([...list])
                list.length = 0
            }

            return newDescription
        }

        async function submitForm(event) {
            event.preventDefault()

            const data = {
                school: schoolInput.current.value,
                degree: degreeInput.current.value,
                fieldOfStudy: fieldOfStudyInput.current.value,
                location: locationInput.current.value,
                startDate: startDateInput.current.value,
                endDate: endDateInput.current.value || null,
                description: parseDescription(descriptionTextbox.current.value),
                imagePath: imagePathInput.current.value,
            }

            if (data.school === '') {
                return schoolInput.current.focus()
            }

            if (data.degree === '') {
                return degreeInput.current.focus()
            }

            if (data.fieldOfStudy === '') {
                return fieldOfStudyInput.current.focus()
            }

            if (data.startDate === '') {
                return startDateInput.current.focus()
            }

            if (data.endDate === '') {
                return endDateInput.current.focus()
            }

            if (isNew) {
                await API.addRecord('Education', data)
            } else {
                await API.updateRecord('Education', id.current, data)
            }

            setRecords(await API.getEducation())
            setModal(null)
        }

        return (
            <div className='modal-bg'>
                <div className='modal'>
                    <CloseIcon onClick={_ => setModal()}/>
                    <h2>{(isNew ? 'New' : 'Edit') + ' Education'}</h2>
                    <form onSubmit={submitForm}>
                        <Input
                            name='School'
                            defaultValue={data?.title || ''}
                            ref={schoolInput}/>
                        <Input
                            name='Degree'
                            defaultValue={data?.company || ''}
                            ref={degreeInput}/>
                        <Input
                            name='Field of Study'
                            defaultValue={data?.employmentType || ''}
                            ref={fieldOfStudyInput}/>
                        <Input
                            name='Location'
                            defaultValue={data?.location || ''}
                            ref={locationInput}/>
                        <div className="field-group">
                            <Input
                                name='Start Date'
                                type='date'
                                defaultValue={data?.startDate?.split('T')[0] || ''}
                                ref={startDateInput}/>
                            <Input
                                name='End Date'
                                label='End Date'
                                type='date'
                                defaultValue={data?.endDate?.split('T')[0] || ''}
                                ref={endDateInput}/>
                        </div>
                        <Textbox
                            name='Description' 
                            defaultValue={stringifyDescription()}
                            ref={descriptionTextbox}/>
                        <Input
                            name='Image Path'
                            defaultValue={data?.imagePath || ''}
                            ref={imagePathInput}/>
                        
                        <button>Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Education