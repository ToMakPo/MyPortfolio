import { useState, useRef, useEffect } from 'react'
import Moment from 'react-moment';
import AddIcon from '../components/AddIcon'
import CloseIcon from '../components/CloseIcon'
import EditIcon from '../components/EditIcon'
import Input from '../components/Input'
import Textbox from '../components/Textbox'
import Checkbox from '../components/Checkbox'
import API from '../utils/API'

import '../styles/Admin.css'
import '../styles/Form.css'

function Certifications({setModal}) {
    const [records, setRecords] = useState()

    useEffect(async _ => {
        setRecords(await API.getCertifications())
    }, [])

    return (
        <section id='certifications-section'>
            <div className='section-header'>
                <h2>Certifications</h2>
                <AddIcon onClick={_ => setModal(<Modal/>)}/>
            </div>
            <div className='items'>
                {records?.map((data, i) => <Item key={i} {...data}/>)}
            </div>
        </section>
    )

    function Item(data) {
        const {name, organization, credentialId, credentialUrl, issueDate, expirationDate, description, imagePath} = data
        
        return (
            <div className='item'>
                {imagePath
                    ? <img src={imagePath} alt={`${organization} organization logo`}/>
                    : <span></span>
                }
                <div>
                    <h3>{name}</h3>
                    <big>{organization}</big>
                    <small>
                        Issued <Moment format={"MMM YYYY"} date={issueDate}/>
                        {expirationDate && ' - '}
                        {expirationDate && <Moment format={"MMM YYYY"} date={expirationDate}/>}
                    </small>
                    {(credentialId || credentialUrl) &&  <small>
                            {credentialId && <span>{credentialId}</span>}
                            {credentialId && credentialUrl && ' • '}
                            {credentialUrl && <a href={credentialUrl} target='_blank'>Credential Link</a>}
                    </small>}
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
        const [noExpiration, setNoExpiration] = useState(!isNew && data?.expirationDate === null)
        
        const [id] = useState(data?._id)
        const nameInput = useRef()
        const organizationInput = useRef()
        const credentialIdInput = useRef()
        const credentialUrlInput = useRef()
        const issueDateInput = useRef()
        const expirationDateInput = useRef()
        const noExpirationCheckbox = useRef()
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

        async function deleteRecord() {
            await API.deleteRecord('Certifications', id)
            setRecords(await API.getCertifications())
            setModal(null)
        }

        async function submitForm(event) {
            event.preventDefault()

            console.log(credentialUrlInput.current.value);

            const data = {
                name: nameInput.current.value,
                organization: organizationInput.current.value,
                credentialId: credentialIdInput.current.value,
                credentialUrl: credentialUrlInput.current.value,
                issueDate: issueDateInput.current.value,
                expirationDate: expirationDateInput.current.value || null,
                description: parseDescription(descriptionTextbox.current.value),
                imagePath: imagePathInput.current.value,
            }

            if (data.name === '') {
                return nameInput.current.focus()
            }

            if (data.organization === '') {
                return organizationInput.current.focus()
            }

            if (data.issueDate === '') {
                return issueDateInput.current.focus()
            }

            if (data.expirationDate === '' && !noExpiration) {
                return expirationDateInput.current.focus()
            }

            if (isNew) {
                await API.addRecord('Certifications', data)
            } else {
                await API.updateRecord('Certifications', id, data)
            }
            
            setRecords(await API.getCertifications())
            setModal(null)
        }

        return (
            <div className='modal-bg'>
                <div className='modal'>
                    <CloseIcon onClick={_ => setModal()}/>
                    <h2>{(isNew ? 'New' : 'Edit') + ' Certifications'}</h2>
                    <form onSubmit={submitForm}>
                        <Input
                            name='Name'
                            defaultValue={data?.name || ''}
                            ref={nameInput}/>
                        <Input
                            name='Organization'
                            defaultValue={data?.organization || ''}
                            ref={organizationInput}/>
                        <Input
                            name='Credential ID'
                            defaultValue={data?.CredentialId || ''}
                            ref={credentialIdInput}
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
                            name='Credential URL'
                            defaultValue={data?.credentialUrl || ''}
                            ref={credentialUrlInput}/>
                        <div className="field-group">
                            <Input
                                name='Issue Date'
                                type='date'
                                defaultValue={data?.issueDate?.split('T')[0] || ''}
                                ref={issueDateInput}/>
                            <Input
                                name='Expiration Date'
                                type={noExpiration ? 'text' : 'date'}
                                defaultValue={noExpiration ? '' : (data?.expirationDate?.split('T')[0] || '')}
                                ref={expirationDateInput}
                                disabled={noExpiration}/>
                        </div>
                        <Checkbox 
                            name='No Expiration'
                            label='This certification has no expiration date'
                            checked={noExpiration}
                            onChange={_ => setNoExpiration(!noExpiration)}
                            ref={noExpirationCheckbox}/>
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

export default Certifications