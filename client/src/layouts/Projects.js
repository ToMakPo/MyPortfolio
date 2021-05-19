import { useState, useRef, useEffect } from 'react'
import Moment from 'react-moment';
import AddIcon from '../components/AddIcon'
import CloseIcon from '../components/CloseIcon'
import EditIcon from '../components/EditIcon'
import Input from '../components/Input'
import Textbox from '../components/Textbox'
import Checkbox from '../components/Checkbox'
import Dropdown from '../components/Dropdown'
import API from '../utils/API'

import '../styles/Admin.css'
import '../styles/Form.css'

function Projects({setModal}) {
    const [records, setRecords] = useState()

    useEffect(async _ => {
        setRecords(await API.getProjects())
    }, [])

    return (
        <section id='projects-section'>
            <div className='section-header'>
                <h2>Projects</h2>
                <AddIcon onClick={_ => setModal(<Modal/>)}/>
            </div>
            <div className='items'>
                {records?.map((data, i) => <Item key={i} {...data}/>)}
            </div>
        </section>
    )

    function Item(data) {
        const {title, company, employmentType, startDate, endDate, location, description, imagePath} = data
        
        return (
            <div className='item'>
                {imagePath 
                    ? <img src={imagePath} alt={`${company} company logo`}/>
                    : <span></span>
                }
                <div>
                    <h3>{title}</h3>
                    <div><span>{company}</span> • <span>{employmentType}</span></div>
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
        const [currentlyInRole, setCurrentlyInRole] = useState(!isNew && data?.endDate === null)
        
        const id = useRef(data?._id)
        const titleInput = useRef()
        const companyInput = useRef()
        const employmentTypeDropdown = useRef()
        const locationInput = useRef()
        const startDateInput = useRef()
        const endDateInput = useRef()
        const currentlyInRoleCheckbox = useRef()
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

        useEffect(_ => {
            
        }, [currentlyInRole])

        function parseDescription(description) {
            const oldDescription = description.split('\n')
            const newDescription = []
            const list = []

            while (oldDescription.length > 0) {
                const line = oldDescription.shift().trim()
                if (line === '') continue

                const split = line.split(/^ *[-•] */)
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
                _id: id.current,
                title: titleInput.current.value,
                company: companyInput.current.value,
                employmentType: employmentTypeDropdown.current.value,
                location: locationInput.current.value,
                startDate: startDateInput.current.value,
                endDate: endDateInput.current.value || null,
                description: parseDescription(descriptionTextbox.current.value),
                imagePath: imagePathInput.current.value,
            }

            if (data.title === '') {
                return refs.titleInput.current.focus()
            }

            if (data.company === '') {
                return refs.companyInput.current.focus()
            }

            if (data.startDate === '') {
                return refs.startDateInput.current.focus()
            }

            if (data.startDate === '' && !currentlyInRole) {
                return refs.endDateInput.current.focus()
            }

            if (isNew) {
                await API.addRecord('Projects', data)
            } else {
                await API.updateRecord('Projects', data)
            }

            setModal(null)
        }

        return (
            <div className='modal-bg'>
                <div className='modal'>
                    <CloseIcon onClick={_ => setModal()}/>
                    <h2>{(isNew ? 'New' : 'Edit') + ' Projects'}</h2>
                    <form onSubmit={submitForm}>
                        <Input
                            name='Title'
                            defaultValue={data?.title || ''}
                            ref={titleInput}/>
                        <Input
                            name='Company'
                            defaultValue={data?.company || ''}
                            ref={companyInput}/>
                        <Dropdown name='Employment Type'
                            defaultValue={data?.employmentType || ''}
                            ref={employmentTypeDropdown}
                            options={[
                                'Full-time',
                                'Part-time',
                                'Contract',
                                'Internship',
                                'Self-employed',
                                'Freelance',
                                'Apprenticeship',
                                'Seasonal'
                            ]}/>
                        <Input
                            name='Location'
                            defaultValue={data?.location || ''}
                            ref={locationInput}/>
                        <div className="field-group">
                            <Input
                                name='Start Date'
                                type='date'
                                defaultValue={data?.startDate?.split('T')[0] || ''}
                                // defaultValue={data?.startDate || ''}
                                ref={startDateInput}/>
                            <Input
                                name='End Date'
                                type={currentlyInRole ? 'text' : 'date'}
                                defaultValue={currentlyInRole ? '' : (data?.endDate?.split('T')[0] || '')}
                                ref={endDateInput}
                                disabled={currentlyInRole}/>
                        </div>
                        <Checkbox 
                            name='Currently in Role'
                            label='I am currently working in this role'
                            checked={currentlyInRole}
                            onChange={_ => setCurrentlyInRole(!currentlyInRole)}
                            ref={currentlyInRoleCheckbox}/>
                        <Textbox
                            name='Description' 
                            defaultValue={stringifyDescription()}
                            ref={descriptionTextbox}/>
                        <Input
                            name='Image Path'
                            defaultValue={data?.imagePath || ''}
                            ref={imagePathInput}/>
                        
                        <div className='button-box'>
                            <button className='bg-accept'>Save</button>
                            {!isNew && <button onClick={deleteRecord}>
                                Delete
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Projects